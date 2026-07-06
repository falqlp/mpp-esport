import { CompetitionKey } from '../services/auth.service';
import { LolMatch } from '../services/esports-api.service';

export const COMPETITIONS: Array<{
  value: CompetitionKey;
  label:
    | 'competition.allSplits'
    | 'competition.name'
    | 'competition.firstStand'
    | 'competition.worlds'
    | 'competition.esportsWorldCup';
}> = [
  { value: 'LEC', label: 'competition.allSplits' },
  { value: 'LCK', label: 'competition.allSplits' },
  { value: 'LCS', label: 'competition.allSplits' },
  { value: 'LPL', label: 'competition.allSplits' },
  { value: 'MSI', label: 'competition.name' },
  { value: 'FIRST_STAND', label: 'competition.firstStand' },
  { value: 'WORLDS', label: 'competition.worlds' },
  { value: 'EWC', label: 'competition.esportsWorldCup' },
];
export function competitionKey(match: LolMatch): CompetitionKey | undefined {
  const name = `${match.league} ${match.tournament}`;
  if (/first\s*stand/i.test(name)) return 'FIRST_STAND';
  if (/\bMSI\b|mid[- ]season invitational/i.test(name)) return 'MSI';
  if (/esports?\s+world\s+cup|\bEWC\b/i.test(name)) return 'EWC';
  if (/\bworlds?\b|world championship/i.test(name)) return 'WORLDS';
  if (/\bLEC\b|league of legends emea championship/i.test(name)) return 'LEC';
  if (/\bLCK\b|league of legends champions korea/i.test(name)) return 'LCK';
  if (/\bLCS\b|league championship series/i.test(name)) return 'LCS';
  if (/\bLPL\b|league of legends pro league/i.test(name)) return 'LPL';
  return undefined;
}
export function filterMatches(matches: LolMatch[], filter: string, favorites: CompetitionKey[]): LolMatch[] {
  const keys = filter === 'favorites' ? favorites : [filter as CompetitionKey];
  return matches.filter((match) => keys.includes(competitionKey(match)!));
}
