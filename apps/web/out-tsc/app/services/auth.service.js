import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'mpp-auth-token';
const USER_KEY = 'mpp-auth-user';
export const authInterceptor = (request, next) => {
    const token = localStorage.getItem(TOKEN_KEY);
    return next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request);
};
export class AuthService {
    constructor() {
        this.http = inject(HttpClient);
        this.userSubject = new BehaviorSubject(this.readUser());
        this.user$ = this.userSubject.asObservable();
    }
    login(email, password) {
        return this.http.post('http://localhost:3000/api/auth/login', { email, password })
            .pipe(tap((session) => this.save(session)));
    }
    register(email, displayName, password) {
        return this.http.post('http://localhost:3000/api/auth/register', { email, displayName, password })
            .pipe(tap((session) => this.save(session)));
    }
    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.userSubject.next(null);
    }
    save(session) {
        localStorage.setItem(TOKEN_KEY, session.token);
        localStorage.setItem(USER_KEY, JSON.stringify(session.user));
        this.userSubject.next(session.user);
    }
    readUser() {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null');
        }
        catch {
            return null;
        }
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map