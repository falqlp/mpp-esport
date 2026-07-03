import { ServiceUnavailableException } from '@nestjs/common';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PandaScoreService } from './pandascore.service';
const panda = {
  id: 1,
  status: 'finished',
  scheduled_at: '2026-01-01T00:00:00Z',
  begin_at: null,
  number_of_games: 3,
  winner_id: 10,
  league: { name: 'LEC', image_url: 'https://x/lec.png' },
  serie: { full_name: 'Spring', name: 'Spring' },
  tournament: { name: 'T' },
  opponents: [
    { opponent: { id: 10, name: 'Alpha', acronym: 'ALP', image_url: 'https://x/logo.png' } },
    { opponent: { id: 20, name: 'Beta', acronym: null, image_url: null } },
  ],
  results: [
    { team_id: 10, score: 2 },
    { team_id: 20, score: 1 },
  ],
};
describe('PandaScoreService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.PANDASCORE_API_TOKEN;
  });
  it('requires an API token', async () => {
    await expect(new PandaScoreService().getMatch('pandascore-1')).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
  it('maps a PandaScore match, its result and available logos', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(panda), { status: 200 })));
    const match = await new PandaScoreService().getMatch('pandascore-1');
    expect(match).toEqual(
      expect.objectContaining({
        id: 'pandascore-1',
        format: 'BO3',
        status: 'finished',
        leagueLogoUrl: 'https://x/lec.png',
        result: { winnerId: 'pandascore-10', score: [2, 1] },
      }),
    );
    expect(match?.teams[0].logoUrl).toContain('thumb_logo.png');
  });
  it('rejects malformed ids without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect(await new PandaScoreService().getMatch('bad')).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
