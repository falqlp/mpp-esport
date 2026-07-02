import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthUser { id: string; email: string; displayName: string }
interface AuthSession { token: string; user: AuthUser }
const TOKEN_KEY = 'mpp-auth-token';
const USER_KEY = 'mpp-auth-user';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request);
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$ = this.userSubject.asObservable();

  login(email: string, password: string): Observable<AuthSession> {
    return this.http.post<AuthSession>('http://localhost:3000/api/auth/login', { email, password })
      .pipe(tap((session) => this.save(session)));
  }
  register(email: string, displayName: string, password: string): Observable<AuthSession> {
    return this.http.post<AuthSession>('http://localhost:3000/api/auth/register', { email, displayName, password })
      .pipe(tap((session) => this.save(session)));
  }
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }
  private save(session: AuthSession): void {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    this.userSubject.next(session.user);
  }
  private readUser(): AuthUser | null {
    try { return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') as AuthUser | null; }
    catch { return null; }
  }
}
