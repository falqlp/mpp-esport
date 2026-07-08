export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface Team {
  id: string;
  name: string;
  code: string;
  logoColor: string;
  logoUrl?: string;
}

export interface LolMatch {
  id: string;
  league: string;
  leagueLogoUrl?: string;
  tournament: string;
  tournamentId: string;
  startsAt: string;
  format: 'BO1' | 'BO3' | 'BO5';
  status: MatchStatus;
  teams: [Team, Team];
  result?: {
    winnerId: string;
    score: [number, number];
  };
}

export interface TeamRosterPlayer {
  id: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  nationality?: string;
  imageUrl?: string;
  substitute?: boolean;
}

export interface TeamRoster {
  teamId: string;
  tournamentId?: string;
  source: 'tournament' | 'team';
  players: TeamRosterPlayer[];
}

export interface Prediction {
  id: string;
  matchId: string;
  playerName: string;
  winnerId: string;
  score: [number, number];
  createdAt: string;
  points: number;
}

export interface CreatePredictionDto {
  matchId: string;
  score: [number, number];
}
