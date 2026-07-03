import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthUser } from '../../../services/auth.service';
import { EsportsApiService, LolMatch, Prediction } from '../../../services/esports-api.service';
import { COMPETITIONS, filterMatches } from '../../competition.utils';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-predictions-tab',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
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
export class PredictionsTabComponent {
  private readonly api = inject(EsportsApiService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly i18n = inject(I18nService);

  @Input() matches: LolMatch[] = [];
  @Input() predictions: Prediction[] = [];
  @Input({ required: true }) user!: AuthUser;
  @Output() readonly changed = new EventEmitter<void>();

  readonly competitions = COMPETITIONS;
  readonly filter = new FormControl('favorites', { nonNullable: true });
  saving = false;

  private readonly scoreValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const match = this.matches.find(({ id }) => id === control.get('matchId')?.value);
    const scoreA = control.get('scoreA')?.value;
    const scoreB = control.get('scoreB')?.value;
    if (!match || scoreA === null || scoreB === null) return null;
    return scoreA === scoreB || Math.max(scoreA, scoreB) !== this.wins(match) ? { score: true } : null;
  };

  readonly form = this.fb.group(
    {
      matchId: this.fb.nonNullable.control('', Validators.required),
      scoreA: new FormControl<number | null>(null, Validators.required),
      scoreB: new FormControl<number | null>(null, Validators.required),
    },
    { validators: this.scoreValidator },
  );

  filtered(): LolMatch[] {
    const visible = this.matches.filter(
      (match) =>
        match.status === 'live' || (match.status === 'upcoming' && new Date(match.startsAt).getTime() > Date.now()),
    );
    return filterMatches(visible, this.filter.value, this.user.favoriteCompetitions);
  }

  openMatches(): LolMatch[] {
    return this.filtered().filter(({ status }) => status === 'upcoming');
  }
  prediction(matchId: string): Prediction | undefined {
    return this.predictions.find((item) => item.matchId === matchId);
  }
  selectedMatch(): LolMatch | undefined {
    return this.matches.find(({ id }) => id === this.form.controls.matchId.value);
  }
  wins(match: LolMatch): number {
    return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3;
  }

  select(match: LolMatch): void {
    if (match.status !== 'upcoming') return;
    this.form.controls.matchId.setValue(match.id);
    this.loadPrediction(match.id);
  }

  loadPrediction(matchId: string): void {
    const prediction = this.prediction(matchId);
    this.form.patchValue({ scoreA: prediction?.score[0] ?? null, scoreB: prediction?.score[1] ?? null });
  }

  submit(): void {
    const value = this.form.getRawValue();
    if (this.form.invalid || value.scoreA === null || value.scoreB === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.api
      .createPrediction({
        matchId: value.matchId,
        score: [value.scoreA, value.scoreB],
      })
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.changed.emit();
          this.snackBar.open(this.i18n.translate('predictions.saved'), this.i18n.translate('common.close'), {
            duration: 3000,
          });
        },
        error: () =>
          this.snackBar.open(this.i18n.translate('predictions.error'), this.i18n.translate('common.close'), {
            duration: 4000,
          }),
      });
  }
}
