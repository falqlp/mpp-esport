import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class EsportsApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.baseUrl = 'http://localhost:3000/api/esports';
    }
    getMatches() {
        return this.http.get(`${this.baseUrl}/matches`);
    }
    getPredictions() {
        return this.http.get(`${this.baseUrl}/predictions`);
    }
    getLeaderboard() {
        return this.http.get(`${this.baseUrl}/leaderboard`);
    }
    createPrediction(payload) {
        return this.http.post(`${this.baseUrl}/predictions`, payload);
    }
    static { this.ɵfac = function EsportsApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EsportsApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EsportsApiService, factory: EsportsApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EsportsApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=esports-api.service.js.map