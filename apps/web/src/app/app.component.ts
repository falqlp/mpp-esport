import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import { EsportsDataService } from '../services/esports-data.service';
import { AppHeaderComponent, AppTab } from './components/app-header.component';
import { AuthPageComponent } from './components/auth-page.component';
import { LeaderboardTabComponent } from './components/leaderboard-tab.component';
import { PredictionsTabComponent } from './components/predictions-tab.component';
import { ProfileTabComponent } from './components/profile-tab.component';
import { ResultsTabComponent } from './components/results-tab.component';

@Component({
  selector: 'app-root', standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, AppHeaderComponent, AuthPageComponent, LeaderboardTabComponent, PredictionsTabComponent, ProfileTabComponent, ResultsTabComponent],
  templateUrl: './app.component.html', styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly data = inject(EsportsDataService);
  readonly user$ = this.auth.user$;
  readonly state$ = this.data.state$;
  activeTab: AppTab = 'predictions';
  reload(): void { this.data.reload(); }
  logout(): void { this.activeTab = 'predictions'; this.auth.logout(); this.data.reload(); }
}
