import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { LolMatch } from './esports.types';
import { PandaScoreService } from './pandascore.service';
import { predictionPoints } from './scoring';

export interface MatchSyncResult {
  matchesSynced: number;
  resultsSynced: number;
  predictionsRecalculated: number;
  syncedAt: string;
}

export interface MatchSyncStatus {
  lastRequestedAt: string | null;
  nextAllowedAt: string | null;
  canSync: boolean;
}

const SYNC_REQUEST_ID = 'pandascore';
const SYNC_COOLDOWN_MS = 15 * 60 * 1000;

@Injectable()
export class MatchSyncService {
  private readonly logger = new Logger(MatchSyncService.name);
  private runningSync?: Promise<MatchSyncResult>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly pandaScore: PandaScoreService,
  ) {}

  sync(): Promise<MatchSyncResult> {
    if (!this.runningSync) {
      this.runningSync = this.startRequestedSync().finally(() => {
        this.runningSync = undefined;
      });
    } else {
      this.logger.log('Synchronisation déjà en cours, attente du résultat existant');
    }
    return this.runningSync;
  }

  async getStatus(): Promise<MatchSyncStatus> {
    const request = await this.prisma.syncRequest.findUnique({ where: { id: SYNC_REQUEST_ID } });
    if (!request) return { lastRequestedAt: null, nextAllowedAt: null, canSync: true };
    const nextAllowedAt = new Date(request.requestedAt.getTime() + SYNC_COOLDOWN_MS);
    return {
      lastRequestedAt: request.requestedAt.toISOString(),
      nextAllowedAt: nextAllowedAt.toISOString(),
      canSync: Date.now() >= nextAllowedAt.getTime(),
    };
  }

  private async startRequestedSync(): Promise<MatchSyncResult> {
    const status = await this.getStatus();
    if (!status.canSync) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Une synchronisation est autorisée toutes les 15 minutes.',
          ...status,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    const requestedAt = new Date();
    await this.prisma.syncRequest.upsert({
      where: { id: SYNC_REQUEST_ID },
      create: { id: SYNC_REQUEST_ID, requestedAt },
      update: { requestedAt },
    });
    this.logger.log('Démarrage de la synchronisation PandaScore demandée par un utilisateur');
    return this.performSync();
  }

  private async performSync(): Promise<MatchSyncResult> {
    const startedAt = Date.now();
    const matches = await this.pandaScore.getMatches(true);
    this.logger.log(`${matches.length} matchs reçus, écriture PostgreSQL par lots…`);
    let resultsSynced = 0;

    for (let index = 0; index < matches.length; index += 100) {
      const batch = matches.slice(index, index + 100);
      const batchStartedAt = Date.now();
      const batchNumber = Math.floor(index / 100) + 1;
      this.logger.log(`Lot ${batchNumber} : écriture de ${batch.length} matchs…`);
      const tournaments = new Map(batch.map((match) => [match.tournamentId, match.tournament]));
      const teams = new Map(batch.flatMap((match) => match.teams.map((team) => [team.id, team] as const)));
      const matchTeamLinks = batch.flatMap((match) =>
        match.teams.map((team, position) => ({ matchId: match.id, teamId: team.id, position })),
      );
      await this.prisma.$transaction([
        ...[...tournaments].map(([id, name]) =>
          this.prisma.tournament.upsert({ where: { id }, create: { id, name }, update: { name } }),
        ),
        ...[...teams.values()].map((team) =>
          this.prisma.team.upsert({
            where: { id: team.id },
            create: { id: team.id, name: team.name, acronym: team.code, imageUrl: team.logoUrl ?? null },
            update: { name: team.name, acronym: team.code, imageUrl: team.logoUrl ?? null },
          }),
        ),
        ...batch.map((match) => {
          if (match.result) resultsSynced += 1;
          const data = this.toDatabaseMatch(match);
          return this.prisma.match.upsert({ where: { id: match.id }, create: data, update: data });
        }),
        this.prisma.matchTeam.deleteMany({ where: { matchId: { in: batch.map((match) => match.id) } } }),
        this.prisma.matchTeam.createMany({ data: matchTeamLinks, skipDuplicates: true }),
      ]);
      this.logger.log(`Lot ${batchNumber} terminé en ${Date.now() - batchStartedAt}ms`);
    }

    const predictionsRecalculated = await this.recalculatePredictions(matches);
    this.logger.log(`Synchronisation complète terminée en ${Date.now() - startedAt}ms`);
    return {
      matchesSynced: matches.length,
      resultsSynced,
      predictionsRecalculated,
      syncedAt: new Date().toISOString(),
    };
  }

  private toDatabaseMatch(match: LolMatch): Prisma.MatchUncheckedCreateInput {
    return {
      id: match.id,
      league: match.league,
      leagueLogoUrl: match.leagueLogoUrl ?? null,
      tournament: match.tournament,
      tournamentId: match.tournamentId,
      startsAt: new Date(match.startsAt),
      format: match.format,
      status: match.status,
      teams: match.teams as unknown as Prisma.InputJsonValue,
      winnerId: match.result?.winnerId ?? null,
      scoreA: match.result?.score[0] ?? null,
      scoreB: match.result?.score[1] ?? null,
      syncedAt: new Date(),
    };
  }

  private async recalculatePredictions(matches: LolMatch[]): Promise<number> {
    const startedAt = Date.now();
    const finishedMatches = matches.filter((match) => match.result).length;
    this.logger.log(`Recalcul des pronostics pour ${finishedMatches} matchs terminés…`);
    let count = 0;
    for (const match of matches) {
      if (!match.result) continue;
      const predictions = await this.prisma.prediction.findMany({ where: { matchId: match.id } });
      for (const prediction of predictions) {
        const predictedWinnerId = prediction.scoreA > prediction.scoreB ? match.teams[0].id : match.teams[1].id;
        const points = predictionPoints(
          match.format,
          predictedWinnerId,
          [prediction.scoreA, prediction.scoreB],
          match.result.winnerId,
          match.result.score,
        );
        await this.prisma.prediction.update({ where: { id: prediction.id }, data: { points } });
        count += 1;
      }
    }
    this.logger.log(`${count} pronostics recalculés en ${Date.now() - startedAt}ms`);
    return count;
  }
}
