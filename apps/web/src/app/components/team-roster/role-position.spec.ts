import { describe, expect, it } from 'vitest';
import { rolePosition } from './role-position';

describe('rolePosition', () => {
  it.each([
    ['top', 'top'],
    ['jun', 'jungle'],
    ['jungler', 'jungle'],
    ['mid', 'middle'],
    ['adc', 'bottom'],
    ['bot', 'bottom'],
    ['sup', 'utility'],
    ['support', 'utility'],
  ])('maps PandaScore role %s to the %s position icon', (role, expected) => {
    expect(rolePosition(role)).toBe(expected);
  });

  it('uses the neutral position for an unknown role', () => {
    expect(rolePosition('coach')).toBe('none');
  });
});
