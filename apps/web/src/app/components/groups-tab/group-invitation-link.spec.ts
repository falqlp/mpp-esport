import { describe, expect, it } from 'vitest';
import { buildGroupInvitationLink } from './group-invitation-link';

describe('buildGroupInvitationLink', () => {
  it('builds a hash-router friendly groups invitation URL', () => {
    expect(buildGroupInvitationLink('https://falqlp.github.io/mpp-esport/', ' abc123 ')).toBe(
      'https://falqlp.github.io/mpp-esport/#/groups?invite=ABC123',
    );
  });

  it('encodes unusual invitation code characters', () => {
    expect(buildGroupInvitationLink('https://example.test', 'a b')).toBe('https://example.test/#/groups?invite=A%20B');
  });
});
