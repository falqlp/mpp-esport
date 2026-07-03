import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CompetitionKey } from '../../../services/auth.service';
import { LolMatch, Prediction } from '../../../services/esports-api.service';
import { COMPETITIONS, filterMatches } from '../../competition.utils';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-results-tab',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, TranslatePipe],
  templateUrl: './results-tab.component.html',
  styleUrl: './results-tab.component.css',
})
export class ResultsTabComponent {
  readonly i18n = inject(I18nService);
  @Input() matches: LolMatch[] = [];
  @Input() predictions: Prediction[] = [];
  @Input() favorites: CompetitionKey[] = [];
  readonly competitions = COMPETITIONS;
  readonly filter = new FormControl('favorites', { nonNullable: true });
  filtered(): LolMatch[] {
    return filterMatches(this.matches, this.filter.value, this.favorites).sort((a, b) =>
      b.startsAt.localeCompare(a.startsAt),
    );
  }
  prediction(matchId: string): Prediction | undefined {
    return this.predictions.find((item) => item.matchId === matchId);
  }
}
