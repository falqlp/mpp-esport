import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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
  tournament: string;
  startsAt: string;
  format: 'BO1' | 'BO3' | 'BO5';
  status: MatchStatus;
  teams: [Team, Team];
  result?: {
    winnerId: string;
    score: [number, number];
  };
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
  playerName: string;
  score: [number, number];
}

export interface LeaderboardEntry {
  playerName: string;
  points: number;
  predictions: number;
}

@Injectable({ providedIn: 'root' })
export class EsportsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/esports';

  getMatches(): Observable<LolMatch[]> {
    return this.http.get<LolMatch[]>(`${this.baseUrl}/matches`);
  }

  getPredictions(): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.baseUrl}/predictions`);
  }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.baseUrl}/leaderboard`);
  }

  createPrediction(payload: CreatePredictionPayload): Observable<Prediction> {
    return this.http.post<Prediction>(`${this.baseUrl}/predictions`, payload);
  }
}
