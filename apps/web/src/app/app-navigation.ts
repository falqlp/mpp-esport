import { AppTab } from './components/app-header/app-header.component';

const MAIN_TABS: AppTab[] = ['predictions', 'results', 'groups', 'preferences', 'profile'];

export function routeForMainTab(tab: AppTab): `/${AppTab}` {
  return `/${tab}`;
}

export function mainTabFromUrl(url: string): AppTab | undefined {
  const segment = url.split(/[?#]/, 1)[0].split('/')[1];
  return MAIN_TABS.find((tab) => tab === segment);
}
