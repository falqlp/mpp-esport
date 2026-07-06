import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import { EsportsDataService } from '../services/esports-data.service';
import { AppHeaderComponent, AppTab } from './components/app-header/app-header.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { GroupsTabComponent } from './components/groups-tab/groups-tab.component';
import { PredictionsTabComponent } from './components/predictions-tab/predictions-tab.component';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { ResultsTabComponent } from './components/results-tab/results-tab.component';
import { ServerStartupNoticeComponent } from './components/server-startup-notice/server-startup-notice.component';
import { TranslatePipe } from './i18n/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    AppHeaderComponent,
    AuthPageComponent,
    GroupsTabComponent,
    PredictionsTabComponent,
    ProfileTabComponent,
    ResultsTabComponent,
    ServerStartupNoticeComponent,
    TranslatePipe,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly data = inject(EsportsDataService);
  private readonly router = inject(Router);
  readonly user$ = this.auth.user$;
  readonly state$ = this.data.state$;
  activeTab: AppTab = 'predictions';
  isMemberPage(): boolean {
    return this.router.url.startsWith('/user/');
  }
  reload(): void {
    this.data.reload();
  }
  logout(): void {
    this.activeTab = 'predictions';
    this.auth.logout();
    this.data.reload();
  }
}
