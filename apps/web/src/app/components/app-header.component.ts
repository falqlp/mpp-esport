import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthUser } from '../../services/auth.service';

export type AppTab = 'predictions' | 'results' | 'leaderboard' | 'profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule],
  template: `
    <mat-toolbar class="topbar">
      <div class="brand"><span>League of Legends</span><h1>MPP Esport</h1></div>
      @if (user) {
        <nav mat-tab-nav-bar [tabPanel]="tabPanel" aria-label="Navigation principale">
          @for (tab of tabs; track tab.value) {
            <button mat-tab-link type="button" [active]="activeTab === tab.value" (click)="tabChange.emit(tab.value)">{{ tab.label }}</button>
          }
        </nav>
        <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
        <div class="account">
          <span><strong>{{ user.displayName }}</strong><small>{{ user.email }}</small></span>
          <button mat-stroked-button type="button" (click)="logout.emit()">Se déconnecter</button>
        </div>
      }
    </mat-toolbar>
  `,
  styles: [`
    .topbar { background: var(--mat-sys-surface-container); border: 1px solid var(--mat-sys-outline-variant); border-radius: 18px; gap: 24px; height: auto; margin-bottom: 18px; min-height: 76px; padding: 10px 16px; position: sticky; top: 10px; z-index: 20; }
    .brand { display: grid; gap: 2px; }
    .brand span { color: var(--mat-sys-secondary); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    h1 { font-size: 28px; font-weight: 850; letter-spacing: -1px; line-height: .95; margin: 0; white-space: nowrap; }
    nav { background: transparent; border: 0; margin-left: auto; max-width: 650px; overflow-x: auto; }
    .account { align-items: center; display: flex; gap: 10px; }
    .account span { display: grid; line-height: 1.2; text-align: right; }
    .account small { color: var(--mat-sys-on-surface-variant); font-size: 11px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    @media (max-width: 680px) { .topbar { align-items: stretch; flex-direction: column; gap: 8px; top: 4px; } nav { margin: 0; max-width: 100%; width: 100%; } .account { justify-content: space-between; } .account span { text-align: left; } }
  `],
})
export class AppHeaderComponent {
  @Input() user: AuthUser | null = null;
  @Input() activeTab: AppTab = 'predictions';
  @Output() readonly tabChange = new EventEmitter<AppTab>();
  @Output() readonly logout = new EventEmitter<void>();
  readonly tabs: Array<{ value: AppTab; label: string }> = [
    { value: 'predictions', label: 'Pronostics' }, { value: 'results', label: 'Résultats' },
    { value: 'leaderboard', label: 'Classement' }, { value: 'profile', label: 'Profil' },
  ];
}
