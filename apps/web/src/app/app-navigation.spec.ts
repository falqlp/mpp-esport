import { describe, expect, it } from 'vitest';
import { mainTabFromUrl, routeForMainTab } from './app-navigation';

describe('main tab navigation', () => {
  it('gives every main tab its own route', () => {
    expect(routeForMainTab('predictions')).toBe('/predictions');
    expect(routeForMainTab('results')).toBe('/results');
    expect(routeForMainTab('groups')).toBe('/groups');
    expect(routeForMainTab('profile')).toBe('/profile');
    expect(routeForMainTab('preferences')).toBe('/preferences');
  });

  it('derives the active tab from its URL', () => {
    expect(mainTabFromUrl('/results')).toBe('results');
    expect(mainTabFromUrl('/groups')).toBe('groups');
    expect(mainTabFromUrl('/profile')).toBe('profile');
    expect(mainTabFromUrl('/preferences')).toBe('preferences');
    expect(mainTabFromUrl('/predictions')).toBe('predictions');
    expect(mainTabFromUrl('/user/u2')).toBeUndefined();
  });
});
