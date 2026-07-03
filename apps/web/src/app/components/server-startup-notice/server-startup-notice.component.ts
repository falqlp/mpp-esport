import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { hasSeenStartupNotice, markStartupNoticeAsSeen } from './startup-notice.storage';

@Component({
  selector: 'app-server-startup-notice',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TranslatePipe],
  templateUrl: './server-startup-notice.component.html',
  styleUrl: './server-startup-notice.component.css',
})
export class ServerStartupNoticeComponent {
  visible = !hasSeenStartupNotice(localStorage);

  constructor() {
    if (this.visible) markStartupNoticeAsSeen(localStorage);
  }

  dismiss(): void {
    this.visible = false;
  }
}
