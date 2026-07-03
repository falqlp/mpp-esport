import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthUser } from '../../../services/auth.service';
import { I18nService, LANGUAGES, Language, TranslationKey } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

export type AppTab = 'predictions' | 'results' | 'groups' | 'profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatTabsModule, MatToolbarModule, TranslatePipe],
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
  readonly tabs: Array<{ value: AppTab; label: TranslationKey }> = [
    { value: 'predictions', label: 'nav.predictions' },
    { value: 'results', label: 'nav.results' },
    { value: 'groups', label: 'nav.groups' },
    { value: 'profile', label: 'nav.profile' },
  ];
  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}
