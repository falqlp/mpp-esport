import type { TranslationKey } from '../../i18n/i18n.service';

export type AppTab = 'predictions' | 'results' | 'groups' | 'preferences' | 'profile';

export const MAIN_NAV_TABS: ReadonlyArray<{ value: AppTab; label: TranslationKey }> = [
  { value: 'predictions', label: 'nav.predictions' },
  { value: 'results', label: 'nav.results' },
  { value: 'groups', label: 'nav.groups' },
];
