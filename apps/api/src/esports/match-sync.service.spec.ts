import { describe, expect, it, vi } from 'vitest';
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
  it('upserts matches and recalculates prediction points', async () => {
    const operation = Promise.resolve();
    const prisma = {
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
  });
  it('deduplicates concurrent synchronizations', async () => {
    let resolve!: (value: never[]) => void;
    const pending = new Promise<never[]>((r) => (resolve = r));
    const prisma = { match: { upsert: vi.fn() }, prediction: { findMany: vi.fn() }, $transaction: vi.fn() };
    const panda = { getMatches: vi.fn().mockReturnValue(pending) };
    const service = new MatchSyncService(prisma as never, panda as never);
    const first = service.sync(),
      second = service.sync();
    expect(first).toBe(second);
    resolve([]);
    await first;
    expect(panda.getMatches).toHaveBeenCalledOnce();
  });
});
