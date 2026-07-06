import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma.service';

const groupInclude = { memberships: { include: { user: { select: { id: true, displayName: true } } } } } as const;
type GroupWithMembers = Prisma.GroupGetPayload<{ include: typeof groupInclude }>;

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: { name?: string; league?: string; tournament?: string; isPublic?: boolean }) {
    const name = input.name?.trim() ?? '';
    const league = input.league?.trim() ?? '';
    const tournament = input.tournament?.trim() ?? '';
    if (name.length < 3 || name.length > 60)
      throw new BadRequestException('Group name must contain 3 to 60 characters');
    const availableTournament = await this.prisma.match.findFirst({
      where: { league, tournament, status: 'upcoming', startsAt: { gt: new Date() } },
      select: { id: true },
    });
    if (!availableTournament) throw new BadRequestException('Tournament has no upcoming match');
    const group = await this.prisma.group.create({
      data: {
        name,
        league,
        tournament,
        isPublic: input.isPublic === true,
        invitationCode: randomBytes(5).toString('hex').toUpperCase(),
        ownerId: userId,
        memberships: { create: { userId } },
      },
      include: groupInclude,
    });
    return this.get(group.id, userId);
  }

  async availableCompetitions() {
    const matches = await this.prisma.match.findMany({
      where: { status: 'upcoming', startsAt: { gt: new Date() } },
      select: { league: true, tournament: true, startsAt: true },
      orderBy: { startsAt: 'asc' },
    });
    const competitions = new Map<string, { league: string; tournament: string; nextMatchAt: string }>();
    for (const match of matches) {
      const key = `${match.league}\u0000${match.tournament}`;
      if (!competitions.has(key)) {
        competitions.set(key, {
          league: match.league,
          tournament: match.tournament,
          nextMatchAt: match.startsAt.toISOString(),
        });
      }
    }
    return [...competitions.values()];
  }

  async mine(userId: string) {
    const groups = await this.prisma.group.findMany({
      where: { memberships: { some: { userId } } },
      include: groupInclude,
      orderBy: { createdAt: 'desc' },
    });
    return groups.map((group) => this.summary(group));
  }

  async searchPublic(query = '') {
    const search = query.trim();
    const groups = await this.prisma.group.findMany({
      where: { isPublic: true, ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}) },
      include: groupInclude,
      orderBy: { name: 'asc' },
      take: 30,
    });
    return groups.map((group) => this.summary(group, false));
  }

  async join(userId: string, input: { invitationCode?: string; groupId?: string }) {
    const invitationCode = input.invitationCode?.trim().toUpperCase();
    const group = invitationCode
      ? await this.prisma.group.findUnique({ where: { invitationCode }, select: { id: true } })
      : input.groupId
        ? await this.prisma.group.findUnique({ where: { id: input.groupId, isPublic: true }, select: { id: true } })
        : null;
    if (!group) throw new NotFoundException('Group not found');
    if (await this.prisma.groupMembership.findUnique({ where: { groupId_userId: { groupId: group.id, userId } } }))
      throw new ConflictException('Already a member');
    await this.prisma.groupMembership.create({ data: { groupId: group.id, userId } });
    return this.get(group.id, userId);
  }

  async get(groupId: string, userId: string) {
    const group = await this.prisma.group.findUnique({ where: { id: groupId }, include: groupInclude });
    if (!group || !group.memberships.some((membership) => membership.user.id === userId))
      throw new NotFoundException('Group not found');
    const userIds = group.memberships.map((membership) => membership.user.id);
    const scores = await this.prisma.prediction.groupBy({
      by: ['userId'],
      where: { userId: { in: userIds }, match: { league: group.league, tournament: group.tournament } },
      _sum: { points: true },
      _count: { _all: true },
    });
    const byUser = new Map(scores.map((score) => [score.userId, score]));
    const leaderboard = group.memberships
      .map(({ user }) => ({
        userId: user.id,
        playerName: user.displayName,
        points: byUser.get(user.id)?._sum.points ?? 0,
        predictions: byUser.get(user.id)?._count._all ?? 0,
      }))
      .sort((a, b) => b.points - a.points || a.playerName.localeCompare(b.playerName));
    return { ...this.summary(group), leaderboard };
  }

  async memberPredictions(viewerId: string, memberId: string) {
    const sharedGroup = await this.prisma.groupMembership.findFirst({
      where: { userId: viewerId, group: { memberships: { some: { userId: memberId } } } },
      select: { groupId: true },
    });
    if (!sharedGroup) throw new NotFoundException('Group member not found');

    const predictions = await this.prisma.prediction.findMany({
      where: { userId: memberId, match: { status: 'finished' } },
      include: { user: { select: { displayName: true } }, match: true },
      orderBy: { match: { startsAt: 'desc' } },
    });
    const playerName = predictions[0]?.user.displayName ?? (await this.memberName(memberId));
    return {
      userId: memberId,
      playerName,
      predictions: predictions.map((prediction) => ({
        id: prediction.id,
        matchId: prediction.matchId,
        winnerId: prediction.winnerId,
        createdAt: prediction.createdAt.toISOString(),
        points: prediction.points,
        score: [prediction.scoreA, prediction.scoreB] as [number, number],
        match: {
          ...prediction.match,
          startsAt: prediction.match.startsAt.toISOString(),
          syncedAt: prediction.match.syncedAt?.toISOString(),
          updatedAt: prediction.match.updatedAt?.toISOString(),
          result:
            prediction.match.winnerId && prediction.match.scoreA !== null && prediction.match.scoreB !== null
              ? {
                  winnerId: prediction.match.winnerId,
                  score: [prediction.match.scoreA, prediction.match.scoreB],
                }
              : undefined,
        },
      })),
    };
  }

  private async memberName(userId: string): Promise<string> {
    const membership = await this.prisma.groupMembership.findFirst({
      where: { userId },
      select: { user: { select: { displayName: true } } },
    });
    if (!membership) throw new NotFoundException('Group member not found');
    return membership.user.displayName;
  }

  private summary(group: GroupWithMembers, revealCode = true) {
    return {
      id: group.id,
      name: group.name,
      league: group.league,
      tournament: group.tournament,
      isPublic: group.isPublic,
      ...(revealCode ? { invitationCode: group.invitationCode } : {}),
      ownerId: group.ownerId,
      memberCount: group.memberships.length,
      createdAt: group.createdAt.toISOString(),
    };
  }
}
