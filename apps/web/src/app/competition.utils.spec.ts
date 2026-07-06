import { describe, expect, it } from 'vitest';
import { LolMatch } from '../services/esports-api.service';
import { competitionKey, filterMatches } from './competition.utils';

function match(league: string, tournament = ''): LolMatch {
  return {
    id: league,
    league,
    tournament,
    startsAt: '2026-07-10T18:00:00Z',
    format: 'BO3',
    status: 'upcoming',
    teams: [
      { id: 'one', name: 'One', code: 'ONE', logoColor: '#000' },
      { id: 'two', name: 'Two', code: 'TWO', logoColor: '#fff' },
    ],
  };
}

describe('competitionKey', () => {
  it('keeps Worlds and the Esports World Cup in separate categories', () => {
    const worlds = match('World Championship', 'Worlds 2026');
    const esportsWorldCup = match('Esports World Cup', 'EWC 2026');

    expect(competitionKey(worlds)).toBe('WORLDS');
    expect(competitionKey(esportsWorldCup)).toBe('EWC');
    expect(filterMatches([worlds, esportsWorldCup], 'WORLDS', [])).toEqual([worlds]);
    expect(filterMatches([worlds, esportsWorldCup], 'EWC', [])).toEqual([esportsWorldCup]);
  });
});
