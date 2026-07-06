import { describe, expect, it } from 'vitest';
import { profileSaveLabel } from './user-profile.view-model';

describe('profileSaveLabel', () => {
  it('always provides a translated label key for the save button', () => {
    expect(profileSaveLabel(false)).toBe('common.save');
    expect(profileSaveLabel(true)).toBe('common.saving');
  });
});
