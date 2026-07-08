import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { EsportsApiService } from '../../../services/esports-api.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { I18nService, TranslationKey } from '../../i18n/i18n.service';
import { roleIconUrl, rolePosition, roleSortOrder } from './role-position';

@Component({
  selector: 'app-team-roster',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, TranslatePipe],
  templateUrl: './team-roster.component.html',
  styleUrl: './team-roster.component.css',
})
export class TeamRosterComponent {
  readonly teamId = input.required<string>();
  private readonly api = inject(EsportsApiService);
  private readonly i18n = inject(I18nService);

  readonly state$ = toObservable(this.teamId).pipe(
    switchMap((teamId) =>
      this.api.getTeamRoster(teamId).pipe(
        map((roster) => ({
          loading: false,
          players: [...roster.players].sort((a, b) => roleSortOrder(a.role) - roleSortOrder(b.role)),
        })),
        catchError(() => of({ loading: false, players: [] })),
        startWith({ loading: true, players: [] }),
      ),
    ),
  );

  getNationalityFlagUrl(nationality: string): string {
    return `https://flagsapi.com/${nationality}/flat/64.png`;
  }

  roleIcon(role: string): string {
    return roleIconUrl(role);
  }

  roleLabel(role: string): string {
    return this.i18n.translate(`team.position.${rolePosition(role)}` as TranslationKey);
  }
}
