import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AuthUser } from '../../../services/auth.service';
import { I18nService, LANGUAGES, Language } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { AppTab, MAIN_NAV_TABS } from './app-header-navigation';

export type { AppTab } from './app-header-navigation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatSelectModule, MatTabsModule, MatToolbarModule, TranslatePipe],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent {
  readonly i18n = inject(I18nService);
  @Input() user: AuthUser | null = null;
  @Input() activeTab: AppTab = 'predictions';
  @Output() readonly tabChange = new EventEmitter<AppTab>();
  @Output() readonly logout = new EventEmitter<void>();
  readonly languages = LANGUAGES;
  readonly tabs = MAIN_NAV_TABS;

  get profileInitial(): string {
    return this.user?.displayName.trim().charAt(0).toLocaleUpperCase() || '?';
  }

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}
