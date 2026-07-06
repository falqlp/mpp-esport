import { describe, expect, it } from 'vitest';
import { LolMatch } from '../../../services/esports-api.service';
import { buildTeamPage } from './team-page.view-model';

const match = (overrides: Partial<LolMatch>): LolMatch => ({
  id: 'match-1',
  league: 'LEC',
  tournament: 'Summer',
  startsAt: '2026-07-10T18:00:00Z',
  format: 'BO3',
  status: 'upcoming',
  teams: [
    { id: 'team-1', name: 'Blue Team', code: 'BLU', logoColor: '#00f' },
    { id: 'team-2', name: 'Red Team', code: 'RED', logoColor: '#f00' },
  ],
  ...overrides,
});

describe('buildTeamPage', () => {
  it('separates upcoming and finished matches and marks wins and losses', () => {
    const upcoming = match({ id: 'upcoming' });
    const win = match({
      id: 'win',
      startsAt: '2026-07-09T18:00:00Z',
      status: 'finished',
      result: { winnerId: 'team-1', score: [2, 0] },
    });
    const loss = match({
      id: 'loss',
      startsAt: '2026-07-08T18:00:00Z',
      status: 'finished',
      teams: [match({}).teams[1], match({}).teams[0]],
      result: { winnerId: 'team-2', score: [2, 1] },
    });

    const page = buildTeamPage('team-1', [loss, upcoming, win]);

    expect(page?.team.name).toBe('Blue Team');
    expect(page?.upcomingMatches.map(({ match }) => match.id)).toEqual(['upcoming']);
    expect(page?.finishedMatches.map(({ outcome }) => outcome)).toEqual(['win', 'loss']);
  });

  it('returns undefined when the team does not exist in the matches', () => {
    expect(buildTeamPage('unknown', [match({})])).toBeUndefined();
  });
});
