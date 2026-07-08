import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
  tournamentId?: string;
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

export interface CreatePredictionPayload {
  matchId: string;
  score: [number, number];
}

export interface MatchSyncResult {
  matchesSynced: number;
  resultsSynced: number;
  predictionsRecalculated: number;
  syncedAt: string;
}

@Injectable({ providedIn: 'root' })
export class EsportsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/esports`;

  getMatches(): Observable<LolMatch[]> {
    return this.http.get<LolMatch[]>(`${this.baseUrl}/matches`);
  }

  getTeamRoster(teamId: string): Observable<TeamRoster> {
    return this.http.get<TeamRoster>(`${this.baseUrl}/teams/${encodeURIComponent(teamId)}/roster`);
  }

  getPredictions(): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.baseUrl}/predictions`);
  }

  createPrediction(payload: CreatePredictionPayload): Observable<Prediction> {
    return this.http.post<Prediction>(`${this.baseUrl}/predictions`, payload);
  }

  deletePrediction(matchId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/predictions/${encodeURIComponent(matchId)}`);
  }

  syncMatches(): Observable<MatchSyncResult> {
    return this.http.post<MatchSyncResult>(`${this.baseUrl}/sync`, {});
  }
}
