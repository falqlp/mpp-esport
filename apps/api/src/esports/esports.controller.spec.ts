import { describe, expect, it, vi } from 'vitest';
import { EsportsController } from './esports.controller';

describe('EsportsController', () => {
  it('allows match synchronization without authentication', async () => {
    const matchSyncService = {
      sync: vi.fn().mockResolvedValue({
        matchesSynced: 1,
        resultsSynced: 0,
        predictionsRecalculated: 0,
        syncedAt: '2026-07-15T12:00:00.000Z',
      }),
    };
    const auth = {
      authenticate: vi.fn(),
      requireUser: vi.fn(),
    };
    const controller = new EsportsController({} as never, matchSyncService as never, auth as never, {} as never);

    await expect(controller.syncMatches()).resolves.toEqual({
      matchesSynced: 1,
      resultsSynced: 0,
      predictionsRecalculated: 0,
      syncedAt: '2026-07-15T12:00:00.000Z',
    });
    expect(auth.authenticate).not.toHaveBeenCalled();
    expect(auth.requireUser).not.toHaveBeenCalled();
    expect(matchSyncService.sync).toHaveBeenCalledOnce();
  });
});
