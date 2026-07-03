import { HttpException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MatchSyncService } from './match-sync.service';
const finished = {
  id: 'm1',
  league: 'LEC',
  tournament: 'Spring',
  startsAt: '2026-01-01T00:00:00Z',
  format: 'BO3' as const,
  status: 'finished' as const,
  teams: [
    { id: 'a', name: 'A', code: 'A', logoColor: '#000' },
    { id: 'b', name: 'B', code: 'B', logoColor: '#111' },
  ] as const,
  result: { winnerId: 'a', score: [2, 1] as [number, number] },
};
describe('MatchSyncService', () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date('2026-01-01T12:00:00Z') }));

  it('upserts matches and recalculates prediction points', async () => {
    const operation = Promise.resolve();
    const prisma = {
      syncRequest: { findUnique: vi.fn().mockResolvedValue(null), upsert: vi.fn().mockResolvedValue({}) },
      match: { upsert: vi.fn().mockReturnValue(operation) },
      prediction: {
        findMany: vi.fn().mockResolvedValue([{ id: 'p', scoreA: 2, scoreB: 1 }]),
        update: vi.fn().mockResolvedValue({}),
      },
      $transaction: vi.fn().mockResolvedValue([]),
    };
    const panda = { getMatches: vi.fn().mockResolvedValue([finished]) };
    const result = await new MatchSyncService(prisma as never, panda as never).sync();
    expect(result).toEqual(expect.objectContaining({ matchesSynced: 1, resultsSynced: 1, predictionsRecalculated: 1 }));
    expect(prisma.prediction.update).toHaveBeenCalledWith({ where: { id: 'p' }, data: { points: 5 } });
    expect(prisma.syncRequest.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ create: { id: 'pandascore', requestedAt: new Date('2026-01-01T12:00:00Z') } }),
    );
  });
  it('deduplicates concurrent synchronizations', async () => {
    let resolve!: (value: never[]) => void;
    const pending = new Promise<never[]>((r) => (resolve = r));
    const prisma = {
      syncRequest: { findUnique: vi.fn().mockResolvedValue(null), upsert: vi.fn().mockResolvedValue({}) },
      match: { upsert: vi.fn() },
      prediction: { findMany: vi.fn() },
      $transaction: vi.fn(),
    };
    const panda = { getMatches: vi.fn().mockReturnValue(pending) };
    const service = new MatchSyncService(prisma as never, panda as never);
    const first = service.sync(),
      second = service.sync();
    expect(first).toBe(second);
    resolve([]);
    await first;
    expect(panda.getMatches).toHaveBeenCalledOnce();
  });

  it('rejects a new request less than 15 minutes after the previous one', async () => {
    const prisma = {
      syncRequest: {
        findUnique: vi.fn().mockResolvedValue({ requestedAt: new Date('2026-01-01T11:50:00Z') }),
        upsert: vi.fn(),
      },
    };
    const panda = { getMatches: vi.fn() };
    const service = new MatchSyncService(prisma as never, panda as never);

    await expect(service.sync()).rejects.toBeInstanceOf(HttpException);
    expect(panda.getMatches).not.toHaveBeenCalled();
    await expect(service.getStatus()).resolves.toEqual({
      lastRequestedAt: '2026-01-01T11:50:00.000Z',
      nextAllowedAt: '2026-01-01T12:05:00.000Z',
      canSync: false,
    });
  });

  it('allows a request exactly 15 minutes after the previous one', async () => {
    const prisma = {
      syncRequest: {
        findUnique: vi.fn().mockResolvedValue({ requestedAt: new Date('2026-01-01T11:45:00Z') }),
        upsert: vi.fn().mockResolvedValue({}),
      },
      prediction: { findMany: vi.fn() },
    };
    const panda = { getMatches: vi.fn().mockResolvedValue([]) };

    await expect(new MatchSyncService(prisma as never, panda as never).sync()).resolves.toEqual(
      expect.objectContaining({ matchesSynced: 0 }),
    );
  });
});
