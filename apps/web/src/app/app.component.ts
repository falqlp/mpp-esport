import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { EsportsApiService, LolMatch, Prediction, Team } from '../services/esports-api.service';
import { EsportsDataService } from '../services/esports-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule,
    MatInputModule, MatListModule, MatSelectModule, MatSnackBarModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly api = inject(EsportsApiService);
  private readonly dataService = inject(EsportsDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(AuthService);
  private matches: LolMatch[] = [];
  private predictions: Prediction[] = [];

  readonly state$ = this.dataService.state$;
  readonly user$ = this.auth.user$;
  readonly competitionControl = new FormControl('all', { nonNullable: true });
  isSaving = false;
  authMode: 'login' | 'register' = 'login';
  isAuthenticating = false;

  readonly authForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', [Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private readonly matchScoreValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const match = this.matches.find(({ id }) => id === control.get('matchId')?.value);
    const scoreA = Number(control.get('scoreA')?.value);
    const scoreB = Number(control.get('scoreB')?.value);
    if (!match || !Number.isInteger(scoreA) || !Number.isInteger(scoreB)) return null;
    const winsRequired = this.winsRequired(match);
    if (scoreA < 0 || scoreB < 0 || scoreA > winsRequired || scoreB > winsRequired) return { scoreOutOfRange: true };
    return scoreA === scoreB || Math.max(scoreA, scoreB) !== winsRequired ? { invalidSeriesScore: true } : null;
  };

  readonly form = this.fb.nonNullable.group({
    playerName: ['Leo', [Validators.required, Validators.minLength(2)]],
    matchId: ['', Validators.required],
    scoreA: [2, [Validators.required, Validators.min(0), Validators.max(3)]],
    scoreB: [1, [Validators.required, Validators.min(0), Validators.max(3)]],
  }, { validators: this.matchScoreValidator });

  ngOnInit(): void {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      if (user) this.form.controls.playerName.setValue(user.displayName);
    });
    this.state$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ status, data }) => {
      if (status !== 'ready') return;
      this.matches = data.matches;
      this.predictions = data.predictions;
      this.loadPrediction(this.form.controls.matchId.value);
      this.form.updateValueAndValidity({ emitEvent: false });
    });
    this.form.controls.matchId.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => this.loadPrediction(id));
    this.form.controls.playerName.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadPrediction(this.form.controls.matchId.value));
    this.competitionControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((competition) => {
      const selected = this.selectedMatch();
      if (selected && !this.matchesCompetition(selected, competition)) this.form.controls.matchId.setValue('');
    });
  }

  retry(): void { this.dataService.reload(); }
  submitAuth(): void {
    if (this.authForm.invalid || this.isAuthenticating) { this.authForm.markAllAsTouched(); return; }
    const { email, displayName, password } = this.authForm.getRawValue();
    this.isAuthenticating = true;
    const request = this.authMode === 'login' ? this.auth.login(email, password) : this.auth.register(email, displayName, password);
    request.pipe(finalize(() => { this.isAuthenticating = false; }), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ user }) => {
        this.form.controls.playerName.setValue(user.displayName);
        this.dataService.reload();
        this.snackBar.open(`Bienvenue ${user.displayName} !`, 'Fermer', { duration: 3000 });
      },
      error: () => this.snackBar.open('Connexion impossible. Vérifie les informations saisies.', 'Fermer', { duration: 4000 }),
    });
  }
  logout(): void { this.auth.logout(); this.dataService.reload(); }
  selectMatch(match: LolMatch): void { this.form.controls.matchId.setValue(match.id); }

  submitPrediction(matches: LolMatch[]): void {
    const value = this.form.getRawValue();
    if (this.form.invalid || !matches.some(({ id }) => id === value.matchId) || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.api.createPrediction({ matchId: value.matchId, playerName: value.playerName.trim(), score: [value.scoreA, value.scoreB] })
      .pipe(finalize(() => { this.isSaving = false; }), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => { this.dataService.reload(); this.snackBar.open('Pronostic enregistré !', 'Fermer', { duration: 3000 }); },
        error: () => this.snackBar.open("Le pronostic n'a pas pu être enregistré.", 'Fermer', { duration: 4000 }),
      });
  }

  selectedMatch(): LolMatch | undefined { return this.matches.find(({ id }) => id === this.form.controls.matchId.value); }
  scoreErrorMessage(): string {
    const match = this.selectedMatch();
    if (!match) return '';
    const wins = this.winsRequired(match);
    if (this.form.hasError('scoreOutOfRange')) return `En ${match.format}, une équipe ne peut pas dépasser ${wins} victoire${wins > 1 ? 's' : ''}.`;
    if (this.form.hasError('invalidSeriesScore')) return `Score invalide : le vainqueur doit atteindre ${wins}, sans égalité.`;
    return '';
  }
  teamName(match: LolMatch, teamId: string): string { return match.teams.find(({ id }) => id === teamId)?.name ?? teamId; }
  majorTeams(matches: LolMatch[]): Team[] {
    const teams = new Map<string, Team>();
    for (const match of matches) {
      if (!/(LCS|LEC|LCK|LPL|LTA|north america|europe|emea|korea|china)/i.test(`${match.league} ${match.tournament}`)) continue;
      for (const team of match.teams) teams.set(team.id, team);
    }
    return [...teams.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
  competitions(matches: LolMatch[]): Array<{ value: string; label: string }> {
    const values = new Map(matches.map((match) => [this.competitionValue(match), `${match.league} — ${match.tournament}`]));
    return [...values].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
  }
  filteredMatches(matches: LolMatch[]): LolMatch[] {
    return matches.filter((match) => this.matchesCompetition(match, this.competitionControl.value));
  }
  upcomingPredictions(matches: LolMatch[], predictions: Prediction[]): Array<{ match: LolMatch; prediction: Prediction }> {
    const playerName = this.form.controls.playerName.value.trim().toLocaleLowerCase();
    const matchesById = new Map(matches.filter(({ status }) => status === 'upcoming').map((match) => [match.id, match]));
    return predictions
      .filter((prediction) => prediction.playerName.trim().toLocaleLowerCase() === playerName)
      .flatMap((prediction) => {
        const match = matchesById.get(prediction.matchId);
        return match ? [{ match, prediction }] : [];
      })
      .sort((a, b) => a.match.startsAt.localeCompare(b.match.startsAt));
  }
  private loadPrediction(matchId: string): void {
    const match = this.matches.find(({ id }) => id === matchId);
    if (!match) return;
    const player = this.form.controls.playerName.value.trim().toLocaleLowerCase();
    const saved = this.predictions.find((item) => item.matchId === matchId && item.playerName.trim().toLocaleLowerCase() === player);
    const wins = this.winsRequired(match);
    this.form.patchValue({ scoreA: saved?.score[0] ?? wins, scoreB: saved?.score[1] ?? Math.max(0, wins - 1) }, { emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }
  private winsRequired(match: LolMatch): number { return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3; }
  private competitionValue(match: LolMatch): string { return `${match.league}|||${match.tournament}`; }
  private matchesCompetition(match: LolMatch, competition: string): boolean { return competition === 'all' || this.competitionValue(match) === competition; }
}
