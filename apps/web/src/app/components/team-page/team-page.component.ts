import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { EsportsDataService } from '../../../services/esports-data.service';
import { LolMatch, Team } from '../../../services/esports-api.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { buildTeamPage } from './team-page.view-model';
import { TeamRosterComponent } from '../team-roster/team-roster.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule, RouterLink, TeamRosterComponent, TranslatePipe],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(EsportsDataService);

  readonly state$ = combineLatest([this.route.paramMap, this.data.state$]).pipe(
    map(([params, state]) => ({
      status: state.status,
      page: buildTeamPage(params.get('id') ?? '', state.data.matches),
    })),
  );

  opponent(match: LolMatch, teamId: string): Team {
    return match.teams.find(({ id }) => id !== teamId) ?? match.teams[0];
  }

  score(match: LolMatch, teamId: string): string {
    const teamIndex = match.teams.findIndex(({ id }) => id === teamId);
    const opponentIndex = teamIndex === 0 ? 1 : 0;
    return `${match.result?.score[teamIndex] ?? 0} – ${match.result?.score[opponentIndex] ?? 0}`;
  }
}
