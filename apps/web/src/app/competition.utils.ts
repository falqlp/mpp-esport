import { CompetitionKey } from '../services/auth.service';
import { LolMatch } from '../services/esports-api.service';

export const COMPETITIONS: Array<{ value: CompetitionKey; label: string }> = [
  { value:'LEC',label:'LEC (tous les splits)' }, { value:'LCK',label:'LCK (tous les splits)' },
  { value:'LCS',label:'LCS (tous les splits)' }, { value:'LPL',label:'LPL (tous les splits)' },
  { value:'MSI',label:'MSI' }, { value:'FIRST_STAND',label:'First Stand' }, { value:'WORLDS',label:'Worlds' },
];
export function competitionKey(match: LolMatch): CompetitionKey | undefined {
  const name=`${match.league} ${match.tournament}`;
  if(/first\s*stand/i.test(name))return'FIRST_STAND'; if(/\bMSI\b|mid[- ]season invitational/i.test(name))return'MSI';
  if(/\bworlds?\b|world championship/i.test(name))return'WORLDS'; if(/\bLEC\b|league of legends emea championship/i.test(name))return'LEC';
  if(/\bLCK\b|league of legends champions korea/i.test(name))return'LCK'; if(/\bLCS\b|league championship series/i.test(name))return'LCS';
  if(/\bLPL\b|league of legends pro league/i.test(name))return'LPL'; return undefined;
}
export function filterMatches(matches:LolMatch[], filter:string, favorites:CompetitionKey[]):LolMatch[]{const keys=filter==='favorites'?favorites:[filter as CompetitionKey];return matches.filter(match=>keys.includes(competitionKey(match)!));}
