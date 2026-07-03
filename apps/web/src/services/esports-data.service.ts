import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, of, shareReplay, startWith, switchMap, timeout } from 'rxjs';
import { EsportsApiService, LeaderboardEntry, LolMatch, Prediction } from './esports-api.service';

export interface EsportsData {
  matches: LolMatch[];
  upcomingMatches: LolMatch[];
  finishedMatches: LolMatch[];
  leaderboard: LeaderboardEntry[];
  predictions: Prediction[];
}

export type EsportsDataState =
  | { status: 'loading'; data: EsportsData }
  | { status: 'ready'; data: EsportsData }
  | { status: 'error'; data: EsportsData; message: string };

const EMPTY_DATA: EsportsData = {
  matches: [],
  upcomingMatches: [],
  finishedMatches: [],
  leaderboard: [],
  predictions: [],
};

const API_STARTUP_TIMEOUT_MS = 120_000;

@Injectable({ providedIn: 'root' })
export class EsportsDataService {
  private readonly api = inject(EsportsApiService);
  private readonly reloadSubject = new BehaviorSubject<void>(undefined);

  readonly state$ = this.reloadSubject.pipe(
    switchMap(() =>
      this.api.syncMatches().pipe(
        catchError(() => of(null)),
        switchMap(() =>
          forkJoin({
            matches: this.api.getMatches(),
            leaderboard: this.api.getLeaderboard(),
            predictions: this.api.getPredictions(),
          }),
        ),
        timeout(API_STARTUP_TIMEOUT_MS),
        map(({ matches, leaderboard, predictions }): EsportsDataState => ({
          status: 'ready',
          data: {
            matches,
            upcomingMatches: matches.filter(({ status }) => status === 'upcoming'),
            finishedMatches: matches.filter(({ status }) => status === 'finished'),
            leaderboard,
            predictions,
          },
        })),
        catchError(() =>
          of<EsportsDataState>({
            status: 'error',
            data: EMPTY_DATA,
            message:
              'Impossible de charger les données. Le serveur gratuit peut prendre une minute à redémarrer ; réessaie dans quelques instants.',
          }),
        ),
        startWith<EsportsDataState>({ status: 'loading', data: EMPTY_DATA }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  reload(): void {
    this.reloadSubject.next();
  }
}
