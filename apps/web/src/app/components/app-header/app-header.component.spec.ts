import { describe, expect, it } from 'vitest';
import { MAIN_NAV_TABS } from './app-header-navigation';

describe('AppHeaderComponent navigation', () => {
  it('keeps the profile outside of the main tabs', () => {
    expect(MAIN_NAV_TABS.map((tab) => tab.value)).toEqual(['predictions', 'results', 'groups']);
  });
});
