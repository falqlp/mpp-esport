import { LolMatch, Team } from '../../../services/esports-api.service';

export type TeamMatchOutcome = 'win' | 'loss';

export interface TeamMatchItem {
  match: LolMatch;
  outcome?: TeamMatchOutcome;
}

export interface TeamPageViewModel {
  team: Team;
  upcomingMatches: TeamMatchItem[];
  finishedMatches: TeamMatchItem[];
}

export function buildTeamPage(teamId: string, matches: LolMatch[]): TeamPageViewModel | undefined {
  const teamMatches = matches.filter(({ teams }) => teams.some(({ id }) => id === teamId));
  const team = teamMatches.flatMap(({ teams }) => teams).find(({ id }) => id === teamId);
  if (!team) return undefined;

  return {
    team,
    upcomingMatches: teamMatches
      .filter(({ status }) => status === 'upcoming' || status === 'live')
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
      .map((match) => ({ match })),
    finishedMatches: teamMatches
      .filter(({ status, result }) => status === 'finished' && result)
      .sort((a, b) => b.startsAt.localeCompare(a.startsAt))
      .map((match) => ({
        match,
        outcome: match.result?.winnerId === teamId ? 'win' : 'loss',
      })),
  };
}
