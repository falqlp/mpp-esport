import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { GroupsApiService, MemberPredictionHistory } from '../../../services/groups-api.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

type PageState = { status: 'loading' } | { status: 'ready'; history: MemberPredictionHistory } | { status: 'error' };

@Component({
  selector: 'app-member-predictions-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule, RouterLink, TranslatePipe],
  templateUrl: './member-predictions-page.component.html',
  styleUrl: './member-predictions-page.component.css',
})
export class MemberPredictionsPageComponent {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(GroupsApiService);

  readonly state$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    switchMap((userId) =>
      this.api.memberPredictions(userId).pipe(
        map((history): PageState => ({ status: 'ready', history })),
        catchError(() => of<PageState>({ status: 'error' })),
        startWith<PageState>({ status: 'loading' }),
      ),
    ),
  );
}
