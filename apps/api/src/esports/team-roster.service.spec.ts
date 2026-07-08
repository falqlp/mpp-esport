import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TeamRosterService } from './team-roster.service';

function setup() {
  const operation = Promise.resolve({});
  const prisma = {
    team: { findUnique: vi.fn().mockResolvedValue({ id: 'pandascore-10' }) },
    match: { findFirst: vi.fn().mockResolvedValue({ tournamentId: 'pandascore-100' }) },
    roster: { findUnique: vi.fn().mockResolvedValue(null), upsert: vi.fn().mockReturnValue(operation) },
    player: { upsert: vi.fn().mockReturnValue(operation) },
    rosterMembership: {
      deleteMany: vi.fn().mockReturnValue(operation),
      create: vi.fn().mockReturnValue(operation),
    },
    $transaction: vi.fn().mockResolvedValue([]),
  };
  const panda = {
    getTournamentRoster: vi.fn(),
    getTeamRoster: vi.fn(),
  };
  return { prisma, panda, service: new TeamRosterService(prisma as never, panda as never) };
}

describe('TeamRosterService', () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date('2026-07-07T12:00:00Z') }));

  it('uses and persists the relevant tournament roster', async () => {
    const { service, prisma, panda } = setup();
    panda.getTournamentRoster.mockResolvedValue([{ id: 'pandascore-1', nickname: 'Top' }]);

    await expect(service.getRoster('pandascore-10')).resolves.toEqual({
      teamId: 'pandascore-10',
      tournamentId: 'pandascore-100',
      source: 'tournament',
      players: [{ id: 'pandascore-1', nickname: 'Top' }],
    });
    expect(panda.getTournamentRoster).toHaveBeenCalledWith('pandascore-100', 'pandascore-10');
    expect(panda.getTeamRoster).not.toHaveBeenCalled();
    expect(prisma.roster.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'pandascore-10:pandascore-100' } }),
    );
  });

  it('falls back to team players when the tournament roster is empty', async () => {
    const { service, panda } = setup();
    panda.getTournamentRoster.mockResolvedValue([]);
    panda.getTeamRoster.mockResolvedValue([{ id: 'pandascore-2', nickname: 'Jungle' }]);

    const roster = await service.getRoster('pandascore-10');
    expect(roster.source).toBe('team');
    expect(roster.players).toHaveLength(1);
  });

  it('uses a fresh cached snapshot without calling PandaScore', async () => {
    const { service, prisma, panda } = setup();
    prisma.roster.findUnique.mockResolvedValue({
      teamId: 'pandascore-10',
      tournamentId: 'pandascore-100',
      source: 'tournament',
      fetchedAt: new Date('2026-07-07T11:00:00Z'),
      memberships: [{ substitute: null, player: { id: 'pandascore-1', nickname: 'Top' } }],
    });

    const roster = await service.getRoster('pandascore-10');
    expect(roster.players[0]).not.toHaveProperty('substitute');
    expect(panda.getTournamentRoster).not.toHaveBeenCalled();
  });

  it('rejects an unknown team', async () => {
    const { service, prisma } = setup();
    prisma.team.findUnique.mockResolvedValue(null);
    await expect(service.getRoster('unknown')).rejects.toBeInstanceOf(NotFoundException);
  });
});
