import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

export type CompetitionKey = 'LEC' | 'LCK' | 'LCS' | 'LPL' | 'MSI' | 'FIRST_STAND' | 'WORLDS';
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  favoriteCompetitions: CompetitionKey[];
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
}
interface AuthSession {
  token: string;
  user: AuthUser;
}
const TOKEN_KEY = 'mpp-auth-token';
const USER_KEY = 'mpp-auth-user';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request);
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$ = this.userSubject.asObservable();

  login(email: string, password: string): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(`${this.baseUrl}/login`, { email, password })
      .pipe(tap((session) => this.save(session)));
  }
  register(email: string, displayName: string, password: string): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(`${this.baseUrl}/register`, { email, displayName, password })
      .pipe(tap((session) => this.save(session)));
  }
  updateFavoriteCompetitions(favoriteCompetitions: CompetitionKey[]): Observable<AuthUser> {
    return this.http
      .put<AuthUser>(`${this.baseUrl}/me/favorite-competitions`, { favoriteCompetitions })
      .pipe(tap((user) => this.saveUser(user)));
  }
  updateProfile(profile: { bio: string | null; avatarUrl: string | null }): Observable<AuthUser> {
    return this.http.put<AuthUser>(`${this.baseUrl}/me/profile`, profile).pipe(tap((user) => this.saveUser(user)));
  }
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }
  private save(session: AuthSession): void {
    localStorage.setItem(TOKEN_KEY, session.token);
    this.saveUser(session.user);
  }
  private saveUser(user: AuthUser): void {
    const normalized = { ...user, favoriteCompetitions: user.favoriteCompetitions ?? [] };
    localStorage.setItem(USER_KEY, JSON.stringify(normalized));
    this.userSubject.next(normalized);
  }
  private readUser(): AuthUser | null {
    try {
      const user = JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') as AuthUser | null;
      return user ? { ...user, favoriteCompetitions: user.favoriteCompetitions ?? [] } : null;
    } catch {
      return null;
    }
  }
}
