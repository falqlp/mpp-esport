import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, Subject, catchError, combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { EsportsApiService, LeaderboardEntry, LolMatch, Prediction, Team } from './services/esports-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  templateUrl: './app/app.component.html',
  styleUrl: './app/app.component.css',
})
export class AppComponent {
  private readonly api = inject(EsportsApiService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly refresh$ = new Subject<void>();
  private matches: LolMatch[] = [];
  private predictions: Prediction[] = [];
  readonly competitionControl = new FormControl('all', { nonNullable: true });

  private readonly matchScoreValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const match = this.matches.find((item) => item.id === control.get('matchId')?.value);
    const scoreA = Number(control.get('scoreA')?.value);
    const scoreB = Number(control.get('scoreB')?.value);
    if (!match || !Number.isInteger(scoreA) || !Number.isInteger(scoreB)) return null;

    const winsRequired = this.winsRequired(match);
    if (scoreA < 0 || scoreB < 0 || scoreA > winsRequired || scoreB > winsRequired) {
      return { scoreOutOfRange: true };
    }
    if (scoreA === scoreB || Math.max(scoreA, scoreB) !== winsRequired) {
      return { invalidSeriesScore: true };
    }

    return null;
  };

  readonly form = this.fb.nonNullable.group(
    {
      playerName: ['Leo', [Validators.required, Validators.minLength(2)]],
      matchId: ['', Validators.required],
      scoreA: [2, [Validators.required, Validators.min(0), Validators.max(3)]],
      scoreB: [1, [Validators.required, Validators.min(0), Validators.max(3)]],
    },
    { validators: this.matchScoreValidator },
  );

  constructor() {
    this.form.controls.matchId.valueChanges.subscribe((matchId) => this.loadPrediction(matchId));
    this.form.controls.playerName.valueChanges.subscribe(() => {
      const matchId = this.form.controls.matchId.value;
      if (matchId) this.loadPrediction(matchId);
    });
    this.competitionControl.valueChanges.subscribe(() => {
      const selected = this.selectedMatch();
      if (selected && !this.matchesCompetition(selected, this.competitionControl.value)) {
        this.form.controls.matchId.setValue('');
      }
    });
  }

  readonly data$: Observable<{
    matches: LolMatch[];
    upcomingMatches: LolMatch[];
    finishedMatches: LolMatch[];
    leaderboard: LeaderboardEntry[];
    predictions: Prediction[];
    selectedMatch?: LolMatch;
    apiAvailable: boolean;
  }> = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() =>
      combineLatest({
        matches: this.api.getMatches(),
        leaderboard: this.api.getLeaderboard(),
        predictions: this.api.getPredictions(),
      }).pipe(
        tap(({ matches, predictions }) => {
          this.matches = matches;
          this.predictions = predictions;
          const matchId = this.form.controls.matchId.value;
          if (matchId) this.loadPrediction(matchId);
          this.form.updateValueAndValidity({ emitEvent: false });
        }),
        map(({ matches, leaderboard, predictions }) => ({
          matches,
          upcomingMatches: matches.filter((match) => match.status === 'upcoming'),
          finishedMatches: matches.filter((match) => match.status === 'finished'),
          leaderboard,
          predictions,
          selectedMatch: matches.find((match) => match.id === this.form.controls.matchId.value),
          apiAvailable: true,
        })),
        catchError(() =>
          of({
            matches: [],
            upcomingMatches: [],
            finishedMatches: [],
            leaderboard: [],
            predictions: [],
            selectedMatch: undefined,
            apiAvailable: false,
          }),
        ),
      ),
    ),
  );

  selectMatch(match: LolMatch): void {
    this.form.controls.matchId.setValue(match.id);
    this.loadPrediction(match.id);
  }

  submitPrediction(matches: LolMatch[]): void {
    const value = this.form.getRawValue();
    const match = matches.find((item) => item.id === value.matchId);
    if (!this.form.valid || !match) {
      this.form.markAllAsTouched();
      return;
    }

    this.api.createPrediction({
      matchId: value.matchId,
      playerName: value.playerName,
      score: [Number(value.scoreA), Number(value.scoreB)],
    }).subscribe({
      next: () => {
        this.refresh$.next();
        this.snackBar.open('Pronostic enregistré !', 'Fermer', { duration: 3000 });
      },
      error: () => this.snackBar.open('Le pronostic est invalide.', 'Fermer', { duration: 4000 }),
    });
  }

  selectedMatch(): LolMatch | undefined {
    return this.matches.find((match) => match.id === this.form.controls.matchId.value);
  }

  scoreErrorMessage(): string {
    const match = this.selectedMatch();
    if (!match) return '';
    const winsRequired = this.winsRequired(match);
    if (this.form.hasError('scoreOutOfRange')) {
      return `En ${match.format}, une équipe ne peut pas dépasser ${winsRequired} victoire${winsRequired > 1 ? 's' : ''}.`;
    }
    if (this.form.hasError('invalidSeriesScore')) {
      return `Score invalide : le vainqueur doit atteindre ${winsRequired}, sans égalité.`;
    }
    return '';
  }

  teamName(match: LolMatch, teamId: string): string {
    return match.teams.find((team) => team.id === teamId)?.name ?? teamId;
  }

  majorTeams(matches: LolMatch[]): Team[] {
    const majorLeague = /(LCS|LEC|LCK|LPL|LTA|north america|europe|emea|korea|china)/i;
    const teams = new Map<string, Team>();
    for (const match of matches) {
      if (!majorLeague.test(`${match.league} ${match.tournament}`)) continue;
      for (const team of match.teams) teams.set(team.id, team);
    }
    return [...teams.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  competitions(matches: LolMatch[]): Array<{ value: string; label: string }> {
    const competitions = new Map<string, string>();
    for (const match of matches) {
      const value = this.competitionValue(match);
      competitions.set(value, `${match.league} — ${match.tournament}`);
    }
    return [...competitions.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  filteredMatches(matches: LolMatch[]): LolMatch[] {
    const competition = this.competitionControl.value;
    return competition === 'all' ? matches : matches.filter((match) => this.matchesCompetition(match, competition));
  }

  private loadPrediction(matchId: string): void {
    const match = this.matches.find((item) => item.id === matchId);
    if (!match) return;

    const playerName = this.form.controls.playerName.value.trim().toLocaleLowerCase();
    const saved = this.predictions.find(
      (prediction) => prediction.matchId === matchId && prediction.playerName.trim().toLocaleLowerCase() === playerName,
    );
    const winsRequired = this.winsRequired(match);
    this.form.patchValue(
      {
        scoreA: saved?.score[0] ?? winsRequired,
        scoreB: saved?.score[1] ?? Math.max(0, winsRequired - 1),
      },
      { emitEvent: false },
    );
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private winsRequired(match: LolMatch): number {
    return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3;
  }

  private competitionValue(match: LolMatch): string {
    return `${match.league}|||${match.tournament}`;
  }

  private matchesCompetition(match: LolMatch, competition: string): boolean {
    return competition === 'all' || this.competitionValue(match) === competition;
  }
}

bootstrapApplication(AppComponent).catch((error) => console.error(error));
