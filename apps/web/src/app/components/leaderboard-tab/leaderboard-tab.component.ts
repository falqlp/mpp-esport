import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LeaderboardEntry } from '../../../services/esports-api.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-leaderboard-tab',
  standalone: true,
  imports: [MatCardModule, MatListModule, TranslatePipe],
  templateUrl: './leaderboard-tab.component.html',
  styleUrl: './leaderboard-tab.component.css',
})
export class LeaderboardTabComponent {
  @Input() leaderboard: LeaderboardEntry[] = [];
}
