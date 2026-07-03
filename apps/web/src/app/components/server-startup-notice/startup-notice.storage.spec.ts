import { describe, expect, it, vi } from 'vitest';
import { hasSeenStartupNotice, markStartupNoticeAsSeen } from './startup-notice.storage';

describe('startup notice storage', () => {
  it('considers the notice unseen when the cache entry is absent', () => {
    const storage = { getItem: vi.fn().mockReturnValue(null) };

    expect(hasSeenStartupNotice(storage)).toBe(false);
  });

  it('considers the notice seen when the cache entry exists', () => {
    const storage = { getItem: vi.fn().mockReturnValue('1') };

    expect(hasSeenStartupNotice(storage)).toBe(true);
  });

  it('stores that the notice has been seen', () => {
    const storage = { setItem: vi.fn() };

    markStartupNoticeAsSeen(storage);

    expect(storage.setItem).toHaveBeenCalledWith('mpp-server-startup-notice-seen', '1');
  });
});
