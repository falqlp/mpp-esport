import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LeaderboardEntry } from '../../services/esports-api.service';

@Component({
  selector: 'app-leaderboard-tab', standalone: true, imports: [MatCardModule, MatListModule],
  template: `<mat-card appearance="outlined"><mat-card-header><mat-card-subtitle>Classement</mat-card-subtitle><mat-card-title>Joueurs</mat-card-title></mat-card-header><mat-card-content><mat-list>
    @for (player of leaderboard; track player.playerName; let index = $index) { <mat-list-item><span matListItemIcon class="rank">{{ index + 1 }}</span><strong matListItemTitle>{{ player.playerName }}</strong><span matListItemMeta>{{ player.points }} pts</span></mat-list-item> }
  </mat-list></mat-card-content></mat-card>`,
  styles: [`mat-card-header { margin-bottom: 16px; } mat-list-item { border-bottom: 1px solid var(--mat-sys-outline-variant); } .rank { align-items:center; background:var(--mat-sys-primary); border-radius:10px; color:var(--mat-sys-on-primary); display:inline-flex; font-weight:900; height:32px; justify-content:center; width:32px; }`],
})
export class LeaderboardTabComponent { @Input() leaderboard: LeaderboardEntry[] = []; }
