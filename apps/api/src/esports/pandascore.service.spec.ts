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
  tournament: { id: 100, name: 'T' },
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
    delete process.env.PANDASCORE_MAX_PAGES_PER_FEED;
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

  it('loads tournament rosters first and maps all available player fields', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    const player = {
      id: 7,
      name: 'Seven',
      first_name: 'Se',
      last_name: 'Ven',
      role: 'mid',
      nationality: 'FR',
      image_url: 'https://x/player.png',
    };
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify([{ team: { id: 10 }, players: [player] }]), { status: 200 })),
    );

    await expect(new PandaScoreService().getTournamentRoster('pandascore-100', 'pandascore-10')).resolves.toEqual([
      {
        id: 'pandascore-7',
        nickname: 'Seven',
        firstName: 'Se',
        lastName: 'Ven',
        role: 'mid',
        nationality: 'FR',
        imageUrl: 'https://x/player.png',
      },
    ]);
  });

  it('loads team players as a fallback source', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            id: 10,
            players: [
              {
                id: 8,
                name: 'Eight',
                first_name: null,
                last_name: null,
                role: null,
                nationality: null,
                image_url: null,
              },
            ],
          }),
          { status: 200 },
        ),
      ),
    );
    await expect(new PandaScoreService().getTeamRoster('pandascore-10')).resolves.toEqual([
      { id: 'pandascore-8', nickname: 'Eight' },
    ]);
  });

  it('loads all feeds, paginates, caches results, and supports forced refresh', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    process.env.PANDASCORE_MAX_PAGES_PER_FEED = '2';
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify([panda]), {
          status: 200,
          headers: { 'x-total': '101' },
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const service = new PandaScoreService();

    const first = await service.getMatches();
    expect(first).toHaveLength(6);
    expect(fetchMock).toHaveBeenCalledTimes(6);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/lol/matches/past?page[number]=2&page[size]=100&sort=-scheduled_at'),
      expect.anything(),
    );

    await expect(service.getMatches()).resolves.toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(6);

    await service.getMatches(true);
    expect(fetchMock).toHaveBeenCalledTimes(12);
  });

  it('shares an in-flight feed request between callers', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const fetchMock = vi.fn().mockImplementation(async () => {
      await gate;
      return new Response('[]', { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);
    const service = new PandaScoreService();

    const first = service.getMatches();
    const second = service.getMatches();
    release?.();

    await expect(Promise.all([first, second])).resolves.toEqual([[], []]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('falls back to one page when the configured page limit is invalid', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    process.env.PANDASCORE_MAX_PAGES_PER_FEED = 'invalid';
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response('[]', {
          status: 200,
          headers: { 'x-total': '500' },
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    await new PandaScoreService().getMatches();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('filters incomplete matches from feeds', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    const incomplete = { ...panda, scheduled_at: null };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => Promise.resolve(new Response(JSON.stringify([incomplete]), { status: 200 }))),
    );

    await expect(new PandaScoreService().getMatches()).resolves.toEqual([]);
  });

  it('maps live and upcoming matches with format and metadata fallbacks', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    const live = {
      ...panda,
      status: 'running',
      number_of_games: 5,
      winner_id: null,
      league: { name: 'LCK', image_url: null },
      serie: null,
      tournament: { id: 101, name: 'Playoffs' },
      opponents: [
        { opponent: { id: -1, name: 'Gamma', acronym: '', image_url: 'logo.png' } },
        { opponent: { id: 2, name: 'Delta', acronym: 'DEL', image_url: null } },
      ],
      results: [],
    };
    const upcoming = {
      ...live,
      id: 2,
      status: 'postponed',
      number_of_games: 1,
      serie: { full_name: null, name: 'Summer' },
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(live), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(upcoming), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const service = new PandaScoreService();

    await expect(service.getMatch('1')).resolves.toEqual(
      expect.objectContaining({ status: 'live', format: 'BO5', tournament: 'Playoffs' }),
    );
    const upcomingMatch = await service.getMatch('2');
    expect(upcomingMatch).toEqual(expect.objectContaining({ status: 'upcoming', format: 'BO1', tournament: 'Summer' }));
    expect(upcomingMatch?.teams[0]).toEqual(
      expect.objectContaining({ code: 'GAM', logoUrl: 'logo.png', logoColor: expect.any(String) }),
    );
    expect(upcomingMatch).not.toHaveProperty('result');
    expect(upcomingMatch).not.toHaveProperty('leagueLogoUrl');
  });

  it('returns a cached match without calling the match endpoint', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    const fetchMock = vi
      .fn()
      .mockImplementation(() => Promise.resolve(new Response(JSON.stringify([panda]), { status: 200 })));
    vi.stubGlobal('fetch', fetchMock);
    const service = new PandaScoreService();
    await service.getMatches();
    expect(fetchMock).toHaveBeenCalledTimes(3);

    await expect(service.getMatch('pandascore-1')).resolves.toEqual(expect.objectContaining({ id: 'pandascore-1' }));
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('reports network, rate-limit, and generic API failures', async () => {
    process.env.PANDASCORE_API_TOKEN = 'token';
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(new Response('{}', { status: 429 }))
      .mockResolvedValueOnce(new Response('{}', { status: 500 }))
      .mockRejectedValueOnce('network down');
    vi.stubGlobal('fetch', fetchMock);
    const service = new PandaScoreService();

    await expect(service.getMatch('1')).rejects.toThrow('PandaScore API is unreachable');
    await expect(service.getMatch('1')).rejects.toThrow('PandaScore rate limit reached');
    await expect(service.getMatch('1')).rejects.toThrow('PandaScore API returned 500');
    await expect(service.getMatch('1')).rejects.toThrow('PandaScore API is unreachable');
  });
});
