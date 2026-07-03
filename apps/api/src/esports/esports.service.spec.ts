import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { EsportsService } from './esports.service';
const teams = [
  { id: 'a', name: 'A', code: 'A', logoColor: '#000' },
  { id: 'b', name: 'B', code: 'B', logoColor: '#111' },
];
const match = (extra = {}) => ({
  id: 'm1',
  league: 'LEC',
  tournament: 'Spring',
  startsAt: new Date(Date.now() + 60_000),
  format: 'BO3',
  status: 'upcoming',
  teams,
  winnerId: null,
  scoreA: null,
  scoreB: null,
  syncedAt: new Date(),
  updatedAt: new Date(),
  ...extra,
});
function setup() {
  const prisma = {
    match: { findMany: vi.fn(), findUnique: vi.fn() },
    prediction: { findMany: vi.fn(), upsert: vi.fn() },
  };
  return { prisma, service: new EsportsService(prisma as never) };
}
describe('EsportsService', () => {
  it('orders and maps matches', async () => {
    const { service, prisma } = setup();
    prisma.match.findMany.mockResolvedValue([match()]);
    const result = await service.getMatches();
    expect(prisma.match.findMany).toHaveBeenCalledWith({ orderBy: { startsAt: 'asc' } });
    expect(result[0].teams).toEqual(teams);
  });
  it('rejects missing, closed and invalid predictions', async () => {
    const { service, prisma } = setup();
    prisma.match.findUnique.mockResolvedValue(null);
    await expect(
      service.createPrediction({ matchId: 'x', score: [2, 1] }, { id: 'u1', displayName: 'Leo' }),
    ).rejects.toBeInstanceOf(NotFoundException);
    prisma.match.findUnique.mockResolvedValue(match({ status: 'live' }));
    await expect(
      service.createPrediction({ matchId: 'm1', score: [2, 1] }, { id: 'u1', displayName: 'Leo' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    prisma.match.findUnique.mockResolvedValue(match());
    await expect(
      service.createPrediction({ matchId: 'm1', score: [1, 1] }, { id: 'u1', displayName: 'Leo' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
  it('rejects creating or updating a prediction once the start time has passed', async () => {
    const { service, prisma } = setup();
    prisma.match.findUnique.mockResolvedValue(match({ status: 'upcoming', startsAt: new Date(Date.now() - 1000) }));
    await expect(
      service.createPrediction({ matchId: 'm1', score: [2, 1] }, { id: 'u1', displayName: 'Leo' }),
    ).rejects.toThrow('Predictions are closed for this match');
    expect(prisma.prediction.upsert).not.toHaveBeenCalled();
  });
  it('links a prediction to the authenticated user and match', async () => {
    const { service, prisma } = setup();
    prisma.match.findUnique.mockResolvedValue(match());
    prisma.prediction.upsert.mockResolvedValue({
      id: 'p',
      matchId: 'm1',
      userId: 'u1',
      user: { displayName: 'Leo' },
      winnerId: 'a',
      scoreA: 2,
      scoreB: 1,
      createdAt: new Date(),
      points: 0,
    });
    const result = await service.createPrediction({ matchId: 'm1', score: [2, 1] }, { id: 'u1', displayName: 'Leo' });
    expect(prisma.prediction.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { matchId_userId: { matchId: 'm1', userId: 'u1' } },
        create: expect.objectContaining({ matchId: 'm1', userId: 'u1', winnerId: 'a' }),
        include: { user: { select: { displayName: true } } },
      }),
    );
    expect(result.playerName).toBe('Leo');
  });
  it('aggregates and sorts the leaderboard', async () => {
    const { service, prisma } = setup();
    prisma.prediction.findMany.mockResolvedValue([
      {
        id: '1',
        matchId: 'm',
        userId: 'u1',
        user: { displayName: 'A' },
        winnerId: 'x',
        scoreA: 1,
        scoreB: 0,
        createdAt: new Date(),
        points: 3,
      },
      {
        id: '2',
        matchId: 'm',
        userId: 'u2',
        user: { displayName: 'B' },
        winnerId: 'x',
        scoreA: 1,
        scoreB: 0,
        createdAt: new Date(),
        points: 5,
      },
    ]);
    expect((await service.getLeaderboard()).map((x) => x.playerName)).toEqual(['B', 'A']);
  });
});
