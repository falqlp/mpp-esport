import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, of, shareReplay, startWith, switchMap, timeout } from 'rxjs';
import { EsportsApiService } from './esports-api.service';
import * as i0 from "@angular/core";
const EMPTY_DATA = { matches: [], upcomingMatches: [], finishedMatches: [], leaderboard: [], predictions: [] };
export class EsportsDataService {
    constructor() {
        this.api = inject(EsportsApiService);
        this.reloadSubject = new BehaviorSubject(undefined);
        this.state$ = this.reloadSubject.pipe(switchMap(() => forkJoin({
            matches: this.api.getMatches(),
            leaderboard: this.api.getLeaderboard(),
            predictions: this.api.getPredictions(),
        }).pipe(timeout(15_000), map(({ matches, leaderboard, predictions }) => ({
            status: 'ready',
            data: {
                matches,
                upcomingMatches: matches.filter(({ status }) => status === 'upcoming'),
                finishedMatches: matches.filter(({ status }) => status === 'finished'),
                leaderboard,
                predictions,
            },
        })), catchError(() => of({
            status: 'error',
            data: EMPTY_DATA,
            message: "Impossible de charger les données. Vérifie que l'API est lancée, puis réessaie.",
        })), startWith({ status: 'loading', data: EMPTY_DATA }))), shareReplay({ bufferSize: 1, refCount: true }));
    }
    reload() { this.reloadSubject.next(); }
    static { this.ɵfac = function EsportsDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EsportsDataService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EsportsDataService, factory: EsportsDataService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EsportsDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=esports-data.service.js.map