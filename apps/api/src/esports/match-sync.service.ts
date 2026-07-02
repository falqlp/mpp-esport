import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { LolMatch } from './esports.types';
import { PandaScoreService } from './pandascore.service';

export interface MatchSyncResult {
  matchesSynced: number;
  resultsSynced: number;
  predictionsRecalculated: number;
  syncedAt: string;
}

@Injectable()
export class MatchSyncService {
  private readonly logger = new Logger(MatchSyncService.name);
  private runningSync?: Promise<MatchSyncResult>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly pandaScore: PandaScoreService,
  ) {}

  @Cron('0 0 */12 * * *', { name: 'pandascore-matches-sync' })
  async scheduledSync(): Promise<void> {
    try {
      const result = await this.sync();
      this.logger.log(`Synchronisation PandaScore terminée : ${result.matchesSynced} matchs`);
    } catch (error) {
      this.logger.error('La synchronisation PandaScore a échoué', error);
    }
  }

  sync(): Promise<MatchSyncResult> {
    if (!this.runningSync) {
      this.logger.log('Démarrage de la synchronisation PandaScore');
      this.runningSync = this.performSync().finally(() => {
        this.runningSync = undefined;
      });
    } else {
      this.logger.log('Synchronisation déjà en cours, attente du résultat existant');
    }
    return this.runningSync;
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
      await this.prisma.$transaction(
        batch.map((match) => {
          if (match.result) resultsSynced += 1;
          const data = this.toDatabaseMatch(match);
          return this.prisma.match.upsert({
            where: { id: match.id },
            create: data,
            update: data,
          });
        }),
      );
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
      tournament: match.tournament,
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
        const points =
          (predictedWinnerId === match.result.winnerId ? 3 : 0) +
          (prediction.scoreA === match.result.score[0] && prediction.scoreB === match.result.score[1] ? 2 : 0);
        await this.prisma.prediction.update({ where: { id: prediction.id }, data: { points } });
        count += 1;
      }
    }
    this.logger.log(`${count} pronostics recalculés en ${Date.now() - startedAt}ms`);
    return count;
  }
}
