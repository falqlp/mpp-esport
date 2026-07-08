export type RolePosition = 'top' | 'jungle' | 'middle' | 'bottom' | 'utility' | 'none';

const POSITION_BY_ROLE: Record<string, RolePosition> = {
  top: 'top',
  toplaner: 'top',
  jungle: 'jungle',
  jungler: 'jungle',
  jun: 'jungle',
  mid: 'middle',
  middle: 'middle',
  midlaner: 'middle',
  adc: 'bottom',
  bot: 'bottom',
  bottom: 'bottom',
  carry: 'bottom',
  sup: 'utility',
  support: 'utility',
  utility: 'utility',
};

const POSITION_ORDER: Record<RolePosition, number> = {
  top: 0,
  jungle: 1,
  middle: 2,
  bottom: 3,
  utility: 4,
  none: 5,
};

export function rolePosition(role: string): RolePosition {
  return POSITION_BY_ROLE[role.trim().toLowerCase()] ?? 'none';
}

export function roleSortOrder(role?: string): number {
  return POSITION_ORDER[role ? rolePosition(role) : 'none'];
}

export function roleIconUrl(role: string): string {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${rolePosition(role)}.png`;
}
