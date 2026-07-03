const STARTUP_NOTICE_STORAGE_KEY = 'mpp-server-startup-notice-seen';

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

export function hasSeenStartupNotice(storage: ReadableStorage): boolean {
  return storage.getItem(STARTUP_NOTICE_STORAGE_KEY) === '1';
}

export function markStartupNoticeAsSeen(storage: WritableStorage): void {
  storage.setItem(STARTUP_NOTICE_STORAGE_KEY, '1');
}
