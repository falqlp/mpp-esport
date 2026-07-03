import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { GroupsService } from './groups.service';

function setup() {
  const prisma = {
    group: { create: vi.fn(), findMany: vi.fn(), findUnique: vi.fn() },
    groupMembership: { create: vi.fn(), findUnique: vi.fn() },
    prediction: { groupBy: vi.fn() },
    match: { findFirst: vi.fn(), findMany: vi.fn() },
  };
  return { prisma, service: new GroupsService(prisma as never) };
}

describe('GroupsService', () => {
  it('creates a competition group and makes its owner a member', async () => {
    const { prisma, service } = setup();
    prisma.group.create.mockResolvedValue({
      id: 'g1',
      name: 'LEC friends',
      league: 'LEC',
      tournament: 'Summer 2026',
      isPublic: false,
      invitationCode: 'ABC12345',
      ownerId: 'u1',
      createdAt: new Date(),
      memberships: [{ user: { id: 'u1', displayName: 'Leo' } }],
    });
    prisma.group.findUnique.mockResolvedValue({
      id: 'g1',
      name: 'LEC friends',
      league: 'LEC',
      tournament: 'Summer 2026',
      isPublic: false,
      invitationCode: 'ABC12345',
      ownerId: 'u1',
      createdAt: new Date(),
      memberships: [{ user: { id: 'u1', displayName: 'Leo' } }],
    });
    prisma.prediction.groupBy.mockResolvedValue([]);
    prisma.match.findFirst.mockResolvedValue({ id: 'm1' });
    const result = await service.create('u1', {
      name: ' LEC friends ',
      league: 'LEC',
      tournament: 'Summer 2026',
      isPublic: false,
    });
    expect(prisma.group.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: 'LEC friends',
          league: 'LEC',
          tournament: 'Summer 2026',
          ownerId: 'u1',
          memberships: { create: { userId: 'u1' } },
        }),
      }),
    );
    expect(result.invitationCode).toBe('ABC12345');
    expect(result.leaderboard).toEqual([{ userId: 'u1', playerName: 'Leo', points: 0, predictions: 0 }]);
  });

  it('searches only public groups and supports a name query', async () => {
    const { prisma, service } = setup();
    prisma.group.findMany.mockResolvedValue([]);
    await service.searchPublic(' lec ');
    expect(prisma.group.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isPublic: true, name: { contains: 'lec', mode: 'insensitive' } },
      }),
    );
  });

  it('joins by invitation code and rejects an existing membership', async () => {
    const { prisma, service } = setup();
    prisma.group.findUnique
      .mockResolvedValueOnce({ id: 'g1' })
      .mockResolvedValueOnce({
        id: 'g1',
        name: 'Group',
        league: 'LEC',
        tournament: 'Summer 2026',
        isPublic: false,
        invitationCode: 'ABC12345',
        ownerId: 'u1',
        createdAt: new Date(),
        memberships: [{ user: { id: 'u1', displayName: 'Leo' } }],
      })
      .mockResolvedValueOnce({ id: 'g1' });
    prisma.groupMembership.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ groupId: 'g1', userId: 'u1' });
    prisma.groupMembership.create.mockResolvedValue({});
    prisma.prediction.groupBy.mockResolvedValue([]);
    await service.join('u1', { invitationCode: ' abc12345 ' });
    expect(prisma.group.findUnique).toHaveBeenCalledWith({
      where: { invitationCode: 'ABC12345' },
      select: { id: true },
    });
    await expect(service.join('u1', { groupId: 'g1' })).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects invalid competition and missing groups', async () => {
    const { prisma, service } = setup();
    prisma.match.findFirst.mockResolvedValue(null);
    await expect(
      service.create('u1', { name: 'Group', league: 'LEC', tournament: 'Old split', isPublic: true }),
    ).rejects.toBeInstanceOf(BadRequestException);
    prisma.group.findUnique.mockResolvedValue(null);
    await expect(service.join('u1', { invitationCode: 'MISSING' })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('calculates a member-only leaderboard for the group competition', async () => {
    const { prisma, service } = setup();
    prisma.group.findUnique.mockResolvedValue({
      id: 'g1',
      name: 'Worlds',
      league: 'Worlds',
      tournament: '2026 Main Event',
      isPublic: true,
      invitationCode: 'CODE1234',
      ownerId: 'u1',
      createdAt: new Date(),
      memberships: [{ user: { id: 'u1', displayName: 'Leo' } }, { user: { id: 'u2', displayName: 'Ana' } }],
    });
    prisma.prediction.groupBy.mockResolvedValue([{ userId: 'u2', _sum: { points: 8 }, _count: { _all: 2 } }]);
    const result = await service.get('g1', 'u1');
    expect(prisma.prediction.groupBy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId: { in: ['u1', 'u2'] },
          match: { league: 'Worlds', tournament: '2026 Main Event' },
        },
      }),
    );
    expect(result.leaderboard.map((entry) => entry.playerName)).toEqual(['Ana', 'Leo']);
  });

  it('lists only distinct tournaments with future upcoming matches', async () => {
    const { prisma, service } = setup();
    prisma.match.findMany.mockResolvedValue([
      { league: 'LEC', tournament: 'Summer 2026', startsAt: new Date('2026-07-10T12:00:00Z') },
      { league: 'LEC', tournament: 'Summer 2026', startsAt: new Date('2026-07-12T12:00:00Z') },
      { league: 'LCK', tournament: 'Season 2026', startsAt: new Date('2026-07-11T12:00:00Z') },
    ]);
    const result = await service.availableCompetitions();
    expect(prisma.match.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'upcoming', startsAt: { gt: expect.any(Date) } } }),
    );
    expect(result).toEqual([
      { league: 'LEC', tournament: 'Summer 2026', nextMatchAt: '2026-07-10T12:00:00.000Z' },
      { league: 'LCK', tournament: 'Season 2026', nextMatchAt: '2026-07-11T12:00:00.000Z' },
    ]);
  });
});
