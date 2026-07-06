import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { AuthUser } from '../../../services/auth.service';
import { EsportsApiService, LolMatch, Prediction } from '../../../services/esports-api.service';
import { COMPETITIONS, filterMatches } from '../../competition.utils';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { adjustedOpponentScore, isValidPredictionScore, shouldShowPredictionScoreError } from './prediction-score';

type ScoreForm = FormGroup<{
  scoreA: FormControl<number | null>;
  scoreB: FormControl<number | null>;
}>;
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const AUTOSAVE_DELAY_MS = 1500;

@Component({
  selector: 'app-predictions-tab',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    TranslatePipe,
  ],
  templateUrl: './predictions-tab.component.html',
  styleUrl: './predictions-tab.component.css',
})
export class PredictionsTabComponent implements OnDestroy {
  private readonly api = inject(EsportsApiService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly i18n = inject(I18nService);

  @Input() matches: LolMatch[] = [];
  @Input() predictions: Prediction[] = [];
  @Input({ required: true }) user!: AuthUser;

  readonly competitions = COMPETITIONS;
  readonly filter = new FormControl('favorites', { nonNullable: true });
  private readonly scoreForms = new Map<string, ScoreForm>();
  private readonly statuses = new Map<string, SaveStatus>();
  private readonly subscriptions = new Subscription();
  readonly deleting = new Set<string>();

  filtered(): LolMatch[] {
    const visible = this.matches.filter(
      (match) =>
        match.status === 'live' || (match.status === 'upcoming' && new Date(match.startsAt).getTime() > Date.now()),
    );
    return filterMatches(visible, this.filter.value, this.user.favoriteCompetitions);
  }

  prediction(matchId: string): Prediction | undefined {
    return this.predictions.find((item) => item.matchId === matchId);
  }

  wins(match: LolMatch): number {
    return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3;
  }

  scoreForm(match: LolMatch): ScoreForm {
    const existing = this.scoreForms.get(match.id);
    if (existing) return existing;

    const prediction = this.prediction(match.id);
    const form = this.fb.group({
      scoreA: new FormControl<number | null>(prediction?.score[0] ?? null),
      scoreB: new FormControl<number | null>(prediction?.score[1] ?? null),
    });
    this.scoreForms.set(match.id, form);
    this.statuses.set(match.id, prediction ? 'saved' : 'idle');
    this.subscriptions.add(
      form.controls.scoreA.valueChanges.subscribe((scoreA) => {
        const scoreB = adjustedOpponentScore(scoreA, form.controls.scoreB.value, this.wins(match));
        if (scoreB !== form.controls.scoreB.value) form.controls.scoreB.setValue(scoreB);
      }),
    );
    this.subscriptions.add(
      form.controls.scoreB.valueChanges.subscribe((scoreB) => {
        const scoreA = adjustedOpponentScore(scoreB, form.controls.scoreA.value, this.wins(match));
        if (scoreA !== form.controls.scoreA.value) form.controls.scoreA.setValue(scoreA);
      }),
    );
    this.subscriptions.add(
      form.valueChanges
        .pipe(
          debounceTime(AUTOSAVE_DELAY_MS),
          distinctUntilChanged(
            (previous, current) => previous.scoreA === current.scoreA && previous.scoreB === current.scoreB,
          ),
        )
        .subscribe(({ scoreA, scoreB }) => {
          if (isValidPredictionScore(scoreA ?? null, scoreB ?? null, this.wins(match))) {
            this.save(match, scoreA as number, scoreB as number);
          }
        }),
    );
    return form;
  }

  saveStatus(matchId: string): SaveStatus {
    return this.statuses.get(matchId) ?? 'idle';
  }

  scoreInvalid(match: LolMatch): boolean {
    const { scoreA, scoreB } = this.scoreForm(match).getRawValue();
    return shouldShowPredictionScoreError(scoreA, scoreB, this.wins(match));
  }

  cancelPrediction(match: LolMatch): void {
    const prediction = this.prediction(match.id);
    if (!prediction || this.deleting.has(match.id)) return;

    const form = this.scoreForm(match);
    this.deleting.add(match.id);
    form.reset({ scoreA: null, scoreB: null });
    this.api.deletePrediction(match.id).subscribe({
      next: () => {
        this.predictions = this.predictions.filter(({ matchId }) => matchId !== match.id);
        this.statuses.set(match.id, 'idle');
        this.deleting.delete(match.id);
      },
      error: () => {
        form.setValue({ scoreA: prediction.score[0], scoreB: prediction.score[1] }, { emitEvent: false });
        this.statuses.set(match.id, 'saved');
        this.deleting.delete(match.id);
        this.snackBar.open(this.i18n.translate('predictions.cancelError'), this.i18n.translate('common.close'), {
          duration: 4000,
        });
      },
    });
  }

  private save(match: LolMatch, scoreA: number, scoreB: number): void {
    this.statuses.set(match.id, 'saving');
    this.api.createPrediction({ matchId: match.id, score: [scoreA, scoreB] }).subscribe({
      next: (saved) => {
        this.predictions = [...this.predictions.filter(({ matchId }) => matchId !== match.id), saved];
        this.statuses.set(match.id, 'saved');
      },
      error: () => {
        this.statuses.set(match.id, 'error');
        this.snackBar.open(this.i18n.translate('predictions.error'), this.i18n.translate('common.close'), {
          duration: 4000,
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
