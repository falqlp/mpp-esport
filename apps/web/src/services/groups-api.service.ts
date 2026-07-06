import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LolMatch } from './esports-api.service';

export interface GroupSummary {
  id: string;
  name: string;
  league: string;
  tournament: string;
  isPublic: boolean;
  invitationCode?: string;
  ownerId: string;
  memberCount: number;
  createdAt: string;
}

export interface GroupLeaderboardEntry {
  userId: string;
  playerName: string;
  avatarUrl: string | null;
  points: number;
  predictions: number;
}

export interface GroupDetails extends GroupSummary {
  leaderboard: GroupLeaderboardEntry[];
}

export interface AvailableGroupCompetition {
  league: string;
  tournament: string;
  nextMatchAt: string;
}

export interface MemberPrediction {
  id: string;
  matchId: string;
  winnerId: string;
  score: [number, number];
  createdAt: string;
  points: number;
  match: LolMatch;
}

export interface MemberPredictionHistory {
  userId: string;
  playerName: string;
  predictions: MemberPrediction[];
}

@Injectable({ providedIn: 'root' })
export class GroupsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/groups`;
  mine(): Observable<GroupSummary[]> {
    return this.http.get<GroupSummary[]>(this.baseUrl, {
      params: new HttpParams().set('_refresh', Date.now().toString()),
    });
  }
  search(query: string): Observable<GroupSummary[]> {
    return this.http.get<GroupSummary[]>(`${this.baseUrl}/public`, { params: new HttpParams().set('q', query) });
  }
  get(id: string): Observable<GroupDetails> {
    return this.http.get<GroupDetails>(`${this.baseUrl}/${id}`);
  }
  memberPredictions(userId: string): Observable<MemberPredictionHistory> {
    return this.http.get<MemberPredictionHistory>(`${this.baseUrl}/users/${encodeURIComponent(userId)}/predictions`);
  }
  competitions(): Observable<AvailableGroupCompetition[]> {
    return this.http.get<AvailableGroupCompetition[]>(`${this.baseUrl}/competitions`);
  }
  create(input: { name: string; league: string; tournament: string; isPublic: boolean }): Observable<GroupDetails> {
    return this.http.post<GroupDetails>(this.baseUrl, input);
  }
  joinByCode(invitationCode: string): Observable<GroupDetails> {
    return this.http.post<GroupDetails>(`${this.baseUrl}/join`, { invitationCode });
  }
  joinPublic(groupId: string): Observable<GroupDetails> {
    return this.http.post<GroupDetails>(`${this.baseUrl}/join`, { groupId });
  }
  delete(groupId: string): Observable<{ deleted: true }> {
    return this.http.delete<{ deleted: true }>(`${this.baseUrl}/${groupId}`);
  }
}
