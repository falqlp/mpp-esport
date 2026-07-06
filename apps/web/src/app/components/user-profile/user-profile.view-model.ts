import type { TranslationKey } from '../../i18n/i18n.service';

export function profileSaveLabel(saving: boolean): TranslationKey {
  return saving ? 'common.saving' : 'common.save';
}
