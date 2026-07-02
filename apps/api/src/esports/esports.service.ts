import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Match as StoredMatch, Prediction as StoredPrediction } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePredictionDto, LeaderboardEntry, LolMatch, Prediction, Team } from './esports.types';

@Injectable()
export class EsportsService {
  private readonly logger = new Logger(EsportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getMatches(): Promise<LolMatch[]> {
    const startedAt = Date.now();
    this.logger.log('Lecture des matchs dans PostgreSQL…');
    const matches = await this.prisma.match.findMany({ orderBy: { startsAt: 'asc' } });
    this.logger.log(`${matches.length} matchs lus en ${Date.now() - startedAt}ms`);
    return matches.map((match) => this.toLolMatch(match));
  }

  async getPredictions(playerName?: string): Promise<Prediction[]> {
    const startedAt = Date.now();
    this.logger.log('Lecture des pronostics dans PostgreSQL…');
    const predictions = await this.prisma.prediction.findMany({
      where: playerName ? { playerName } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    this.logger.log(`${predictions.length} pronostics lus en ${Date.now() - startedAt}ms`);
    return predictions.map((prediction) => this.toPrediction(prediction));
  }

  async createPrediction(dto: CreatePredictionDto, authenticatedName: string): Promise<Prediction> {
    const startedAt = Date.now();
    this.logger.log(`Enregistrement d'un pronostic pour le match ${dto.matchId}…`);
    const storedMatch = await this.prisma.match.findUnique({ where: { id: dto.matchId } });
    if (!storedMatch) throw new NotFoundException('Match not found');
    const match = this.toLolMatch(storedMatch);
    if (match.status !== 'upcoming') {
      throw new BadRequestException('Predictions are closed for this match');
    }

    this.validateScore(match, dto);
    const winnerId = this.winnerFromScore(match, dto.score);
    const playerName = authenticatedName;
    const prediction = await this.prisma.prediction.upsert({
      where: { matchId_playerName: { matchId: dto.matchId, playerName } },
      create: {
        matchId: dto.matchId,
        playerName,
        winnerId,
        scoreA: dto.score[0],
        scoreB: dto.score[1],
        points: this.computePoints(match, dto),
      },
      update: {
        winnerId,
        scoreA: dto.score[0],
        scoreB: dto.score[1],
        points: this.computePoints(match, dto),
        createdAt: new Date(),
      },
    });
    this.logger.log(`Pronostic ${prediction.id} enregistré en ${Date.now() - startedAt}ms`);
    return this.toPrediction(prediction);
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const startedAt = Date.now();
    this.logger.log('Calcul du classement…');
    const board = new Map<string, LeaderboardEntry>();
    const predictions = await this.getPredictions();
    for (const prediction of predictions) {
      const current = board.get(prediction.playerName) ?? {
        playerName: prediction.playerName,
        points: 0,
        predictions: 0,
      };
      current.points += prediction.points;
      current.predictions += 1;
      board.set(prediction.playerName, current);
    }
    const leaderboard = [...board.values()].sort((a, b) => b.points - a.points);
    this.logger.log(`Classement de ${leaderboard.length} joueurs calculé en ${Date.now() - startedAt}ms`);
    return leaderboard;
  }

  private computePoints(match: LolMatch, prediction: CreatePredictionDto): number {
    if (!match.result) return 0;
    const predictedWinnerId = this.winnerFromScore(match, prediction.score);
    const winnerPoints = match.result.winnerId === predictedWinnerId ? 3 : 0;
    const scorePoints =
      match.result.score[0] === prediction.score[0] && match.result.score[1] === prediction.score[1] ? 2 : 0;
    return winnerPoints + scorePoints;
  }

  private validateScore(match: LolMatch, prediction: CreatePredictionDto): void {
    const [scoreA, scoreB] = prediction.score;
    const winsRequired = match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3;
    if (
      !Number.isInteger(scoreA) || !Number.isInteger(scoreB) || scoreA < 0 || scoreB < 0 ||
      scoreA > winsRequired || scoreB > winsRequired
    ) {
      throw new BadRequestException(`Scores must be between 0 and ${winsRequired} for a ${match.format}`);
    }
    if (scoreA === scoreB || Math.max(scoreA, scoreB) !== winsRequired) {
      throw new BadRequestException(`The winner must reach ${winsRequired} wins and the score cannot be tied`);
    }
  }

  private winnerFromScore(match: LolMatch, score: [number, number]): string {
    return score[0] > score[1] ? match.teams[0].id : match.teams[1].id;
  }

  private toPrediction(prediction: StoredPrediction): Prediction {
    return {
      id: prediction.id,
      matchId: prediction.matchId,
      playerName: prediction.playerName,
      winnerId: prediction.winnerId,
      score: [prediction.scoreA, prediction.scoreB],
      createdAt: prediction.createdAt.toISOString(),
      points: prediction.points,
    };
  }

  private toLolMatch(match: StoredMatch): LolMatch {
    const teams = match.teams as unknown as [Team, Team];
    return {
      id: match.id,
      league: match.league,
      ...(match.leagueLogoUrl ? { leagueLogoUrl: match.leagueLogoUrl } : {}),
      tournament: match.tournament,
      startsAt: match.startsAt.toISOString(),
      format: match.format as LolMatch['format'],
      status: match.status as LolMatch['status'],
      teams,
      ...(match.winnerId && match.scoreA !== null && match.scoreB !== null
        ? { result: { winnerId: match.winnerId, score: [match.scoreA, match.scoreB] as [number, number] } }
        : {}),
    };
  }
}
