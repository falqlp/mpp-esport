export function buildGroupInvitationLink(origin: string, invitationCode: string): string {
  const normalizedOrigin = origin.replace(/\/$/, '');
  const encodedCode = encodeURIComponent(invitationCode.trim().toUpperCase());

  return `${normalizedOrigin}/#/groups?invite=${encodedCode}`;
}
