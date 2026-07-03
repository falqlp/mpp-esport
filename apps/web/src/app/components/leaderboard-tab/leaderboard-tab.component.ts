import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LeaderboardEntry } from '../../../services/esports-api.service';

@Component({
  selector: 'app-leaderboard-tab',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './leaderboard-tab.component.html',
  styleUrl: './leaderboard-tab.component.css',
})
export class LeaderboardTabComponent {
  @Input() leaderboard: LeaderboardEntry[] = [];
}
