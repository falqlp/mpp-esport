import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TeamRoster, TeamRosterPlayer } from './esports.types';
import { PandaScoreService } from './pandascore.service';

const ROSTER_CACHE_MS = 6 * 60 * 60 * 1000;

@Injectable()
export class TeamRosterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pandaScore: PandaScoreService,
  ) {}

  async getRoster(teamId: string): Promise<TeamRoster> {
    const team = await this.prisma.team.findUnique({ where: { id: teamId }, select: { id: true } });
    if (!team) throw new NotFoundException('Team not found');

    const relevantMatch = await this.prisma.match.findFirst({
      where: { status: { in: ['live', 'upcoming'] }, teamLinks: { some: { teamId } } },
      orderBy: { startsAt: 'asc' },
      select: { tournamentId: true },
    });
    const tournamentId = relevantMatch?.tournamentId;
    const rosterId = `${teamId}:${tournamentId ?? 'current-team'}`;
    const cached = await this.prisma.roster.findUnique({
      where: { id: rosterId },
      include: { memberships: { include: { player: true } } },
    });
    if (cached && cached.fetchedAt.getTime() > Date.now() - ROSTER_CACHE_MS) return this.toResponse(cached);

    try {
      let source: TeamRoster['source'] = 'tournament';
      let players = tournamentId ? await this.pandaScore.getTournamentRoster(tournamentId, teamId) : [];
      if (players.length === 0) {
        source = 'team';
        players = await this.pandaScore.getTeamRoster(teamId);
      }
      await this.storeRoster(rosterId, teamId, tournamentId, source, players);
      return { teamId, ...(tournamentId ? { tournamentId } : {}), source, players };
    } catch (error) {
      if (cached) return this.toResponse(cached);
      throw error;
    }
  }

  private async storeRoster(
    rosterId: string,
    teamId: string,
    tournamentId: string | undefined,
    source: TeamRoster['source'],
    players: TeamRosterPlayer[],
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.roster.upsert({
        where: { id: rosterId },
        create: { id: rosterId, teamId, tournamentId, source },
        update: { source, fetchedAt: new Date() },
      }),
      this.prisma.rosterMembership.deleteMany({ where: { rosterId } }),
      ...players.flatMap((player) => [
        this.prisma.player.upsert({
          where: { id: player.id },
          create: {
            id: player.id,
            nickname: player.nickname,
            firstName: player.firstName,
            lastName: player.lastName,
            role: player.role,
            nationality: player.nationality,
            imageUrl: player.imageUrl,
          },
          update: {
            nickname: player.nickname,
            firstName: player.firstName,
            lastName: player.lastName,
            role: player.role,
            nationality: player.nationality,
            imageUrl: player.imageUrl,
          },
        }),
        this.prisma.rosterMembership.create({
          data: { rosterId, playerId: player.id, substitute: player.substitute },
        }),
      ]),
    ]);
  }

  private toResponse(roster: {
    teamId: string;
    tournamentId: string | null;
    source: string;
    memberships: Array<{
      substitute: boolean | null;
      player: {
        id: string;
        nickname: string;
        firstName: string | null;
        lastName: string | null;
        role: string | null;
        nationality: string | null;
        imageUrl: string | null;
      };
    }>;
  }): TeamRoster {
    return {
      teamId: roster.teamId,
      ...(roster.tournamentId ? { tournamentId: roster.tournamentId } : {}),
      source: roster.source as TeamRoster['source'],
      players: roster.memberships.map(({ player, substitute }) => ({
        id: player.id,
        nickname: player.nickname,
        ...(player.firstName ? { firstName: player.firstName } : {}),
        ...(player.lastName ? { lastName: player.lastName } : {}),
        ...(player.role ? { role: player.role } : {}),
        ...(player.nationality ? { nationality: player.nationality } : {}),
        ...(player.imageUrl ? { imageUrl: player.imageUrl } : {}),
        ...(substitute === null ? {} : { substitute }),
      })),
    };
  }
}
