import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthUser } from '../../../services/auth.service';

export type AppTab = 'predictions' | 'results' | 'leaderboard' | 'profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent {
  @Input() user: AuthUser | null = null;
  @Input() activeTab: AppTab = 'predictions';
  @Output() readonly tabChange = new EventEmitter<AppTab>();
  @Output() readonly logout = new EventEmitter<void>();
  readonly tabs: Array<{ value: AppTab; label: string }> = [
    { value: 'predictions', label: 'Pronostics' },
    { value: 'results', label: 'Résultats' },
    { value: 'leaderboard', label: 'Classement' },
    { value: 'profile', label: 'Profil' },
  ];
}
