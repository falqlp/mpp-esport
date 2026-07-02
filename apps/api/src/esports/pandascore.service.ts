import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { LolMatch, MatchStatus, Team } from './esports.types';

interface PandaTeam {
  id: number;
  name: string;
  acronym: string | null;
  image_url: string | null;
}

interface PandaMatch {
  id: number;
  status: 'not_started' | 'running' | 'finished' | 'canceled' | 'postponed';
  scheduled_at: string | null;
  begin_at: string | null;
  number_of_games: number | null;
  winner_id: number | null;
  league: { name: string };
  serie: { full_name: string | null; name: string | null } | null;
  tournament: { name: string };
  opponents: Array<{ opponent: PandaTeam }>;
  results: Array<{ team_id: number; score: number }>;
}

@Injectable()
export class PandaScoreService {
  private readonly logger = new Logger(PandaScoreService.name);
  private readonly baseUrl = 'https://api.pandascore.co';
  private readonly cacheDurationMs = 5 * 60 * 1000;
  private cache?: { expiresAt: number; matches: LolMatch[] };
  private pendingRequest?: Promise<LolMatch[]>;

  async getMatches(forceRefresh = false): Promise<LolMatch[]> {
    if (!forceRefresh && this.cache && this.cache.expiresAt > Date.now()) {
      this.logger.debug(`Cache utilisé : ${this.cache.matches.length} matchs`);
      return this.cache.matches;
    }
    if (this.pendingRequest) {
      this.logger.log('Une requête PandaScore est déjà en cours, attente du même résultat…');
      return this.pendingRequest;
    }

    this.pendingRequest = this.loadMatches();
    try {
      return await this.pendingRequest;
    } finally {
      this.pendingRequest = undefined;
    }
  }

  private async loadMatches(): Promise<LolMatch[]> {
    const startedAt = Date.now();
    this.logger.log('Chargement des flux PandaScore upcoming, running et past…');
    const [upcoming, running, past] = await Promise.all([
      this.fetchAllPages('/lol/matches/upcoming', 'scheduled_at'),
      this.fetchAllPages('/lol/matches/running', 'scheduled_at'),
      this.fetchAllPages('/lol/matches/past', '-scheduled_at'),
    ]);

    const matches = [...upcoming, ...running, ...past]
      .map((match) => this.toLolMatch(match))
      .filter((match): match is LolMatch => match !== undefined);
    this.cache = { expiresAt: Date.now() + this.cacheDurationMs, matches };
    this.logger.log(`${matches.length} matchs PandaScore chargés en ${Date.now() - startedAt}ms`);
    return matches;
  }

  async getMatch(matchId: string): Promise<LolMatch | undefined> {
    const cached = this.cache?.matches.find((match) => match.id === matchId);
    if (cached) return cached;

    const pandaId = matchId.replace(/^pandascore-/, '');
    if (!/^\d+$/.test(pandaId)) return undefined;
    const match = await this.request<PandaMatch>(`/matches/${pandaId}`);
    return this.toLolMatch(match);
  }

  private async fetchAllPages(path: string, sort: string): Promise<PandaMatch[]> {
    const startedAt = Date.now();
    this.logger.log(`Chargement du flux ${path}…`);
    const first = await this.requestPage(path, 1, sort);
    const availablePages = Math.ceil(first.total / 100);
    const configuredLimit = Number(process.env.PANDASCORE_MAX_PAGES_PER_FEED ?? 1);
    const pageLimit = Number.isInteger(configuredLimit) && configuredLimit > 0 ? configuredLimit : 1;
    const totalPages = Math.min(availablePages, pageLimit);
    const matches = [...first.items];

    for (let page = 2; page <= totalPages; page += 1) {
      const result = await this.requestPage(path, page, sort);
      matches.push(...result.items);
    }
    this.logger.log(`${path} : ${matches.length}/${first.total} matchs chargés en ${Date.now() - startedAt}ms`);
    return matches;
  }

  private async requestPage(path: string, page: number, sort: string): Promise<{ items: PandaMatch[]; total: number }> {
    const url = `${path}?page[number]=${page}&page[size]=100&sort=${encodeURIComponent(sort)}`;
    const response = await this.fetch(url);
    const items = (await response.json()) as PandaMatch[];
    this.logger.debug(`${path} page ${page} : ${items.length} éléments JSON décodés`);
    return { items, total: Number(response.headers.get('x-total') ?? items.length) };
  }

  private async request<T>(path: string): Promise<T> {
    const response = await this.fetch(path);
    return (await response.json()) as T;
  }

  private async fetch(path: string): Promise<Response> {
    const token = process.env.PANDASCORE_API_TOKEN;
    if (!token) {
      throw new ServiceUnavailableException('PANDASCORE_API_TOKEN is not configured');
    }

    const startedAt = Date.now();
    this.logger.log(`--> PandaScore GET ${path}`);
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      this.logger.error(`<-- PandaScore GET ${path} échec après ${Date.now() - startedAt}ms`, error instanceof Error ? error.stack : undefined);
      throw new ServiceUnavailableException('PandaScore API is unreachable');
    }

    if (!response.ok) {
      const message = response.status === 429
        ? 'PandaScore rate limit reached; retry after the quota resets'
        : `PandaScore API returned ${response.status}`;
      this.logger.warn(`${message} for ${path}`);
      throw new ServiceUnavailableException(message);
    }
    this.logger.log(`<-- PandaScore GET ${path} ${response.status} ${Date.now() - startedAt}ms`);
    return response;
  }

  private toLolMatch(match: PandaMatch): LolMatch | undefined {
    const opponents = match.opponents.map((entry) => entry.opponent).filter(Boolean);
    if (opponents.length !== 2 || !match.scheduled_at) return undefined;

    const teams = opponents.map((team) => this.toTeam(team)) as [Team, Team];
    const status = this.toStatus(match.status);
    const resultA = match.results.find((result) => result.team_id === opponents[0].id)?.score ?? 0;
    const resultB = match.results.find((result) => result.team_id === opponents[1].id)?.score ?? 0;

    return {
      id: `pandascore-${match.id}`,
      league: match.league.name,
      tournament: match.serie?.full_name ?? match.serie?.name ?? match.tournament.name,
      startsAt: match.scheduled_at,
      format: match.number_of_games === 5 ? 'BO5' : match.number_of_games === 3 ? 'BO3' : 'BO1',
      status,
      teams,
      ...(status === 'finished' && match.winner_id
        ? {
            result: {
              winnerId: `pandascore-${match.winner_id}`,
              score: [resultA, resultB] as [number, number],
            },
          }
        : {}),
    };
  }

  private toStatus(status: PandaMatch['status']): MatchStatus {
    if (status === 'running') return 'live';
    if (status === 'finished') return 'finished';
    return 'upcoming';
  }

  private toTeam(team: PandaTeam): Team {
    return {
      id: `pandascore-${team.id}`,
      name: team.name,
      code: team.acronym || team.name.slice(0, 3).toUpperCase(),
      logoColor: this.colorFromId(team.id),
      ...(team.image_url ? { logoUrl: this.thumbnailUrl(team.image_url) } : {}),
    };
  }

  private thumbnailUrl(url: string): string {
    const separator = url.lastIndexOf('/');
    return separator >= 0 ? `${url.slice(0, separator + 1)}thumb_${url.slice(separator + 1)}` : url;
  }

  private colorFromId(id: number): string {
    const colors = ['#2563eb', '#7c3aed', '#dc2626', '#d97706', '#059669', '#db2777'];
    return colors[Math.abs(id) % colors.length];
  }
}
