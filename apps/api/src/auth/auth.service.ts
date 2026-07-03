import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PrismaService } from '../prisma.service';

const scrypt = promisify(scryptCallback);
export const COMPETITION_KEYS = ['LEC', 'LCK', 'LCS', 'LPL', 'MSI', 'FIRST_STAND', 'WORLDS'] as const;
export type CompetitionKey = (typeof COMPETITION_KEYS)[number];
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  favoriteCompetitions: string[];
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: { email?: string; displayName?: string; password?: string }) {
    const email = this.validEmail(input.email);
    const displayName = input.displayName?.trim() ?? '';
    const password = input.password ?? '';
    if (displayName.length < 2 || password.length < 8)
      throw new BadRequestException('Nom trop court ou mot de passe de moins de 8 caractères');
    if (await this.prisma.user.findUnique({ where: { email } }))
      throw new BadRequestException('Cette adresse email est déjà utilisée');
    const user = await this.prisma.user.create({
      data: { email, displayName, passwordHash: await this.hashPassword(password) },
    });
    return this.session(user);
  }

  async login(input: { email?: string; password?: string }) {
    const email = this.validEmail(input.email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await this.verifyPassword(input.password ?? '', user.passwordHash)))
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    return this.session(user);
  }

  async authenticate(authorization?: string): Promise<AuthUser | undefined> {
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined;
    if (!token) return undefined;
    const [payload, signature] = token.split('.');
    const expectedSignature = payload ? this.sign(payload) : '';
    if (
      !payload ||
      !signature ||
      signature.length !== expectedSignature.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    )
      return undefined;
    try {
      const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string; exp: number };
      if (data.exp < Date.now()) return undefined;
      const user = await this.prisma.user.findUnique({ where: { id: data.sub } });
      return user ? this.toAuthUser(user) : undefined;
    } catch {
      return undefined;
    }
  }

  requireUser(user?: AuthUser): AuthUser {
    if (!user) throw new UnauthorizedException('Connexion requise');
    return user;
  }

  async updateFavoriteCompetitions(userId: string, values?: unknown): Promise<AuthUser> {
    if (
      !Array.isArray(values) ||
      values.some((value) => typeof value !== 'string' || !COMPETITION_KEYS.includes(value as CompetitionKey))
    ) {
      throw new BadRequestException('Liste de compétitions invalide');
    }
    const favoriteCompetitions = [...new Set(values as CompetitionKey[])];
    const user = await this.prisma.user.update({ where: { id: userId }, data: { favoriteCompetitions } });
    return this.toAuthUser(user);
  }

  private session(user: AuthUser) {
    const payload = Buffer.from(JSON.stringify({ sub: user.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString(
      'base64url',
    );
    return { token: `${payload}.${this.sign(payload)}`, user: this.toAuthUser(user) };
  }
  private toAuthUser(user: AuthUser): AuthUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      favoriteCompetitions: user.favoriteCompetitions ?? [],
    };
  }
  private sign(payload: string): string {
    return createHmac('sha256', process.env.AUTH_SECRET ?? 'dev-only-change-me')
      .update(payload)
      .digest('base64url');
  }
  private validEmail(value?: string): string {
    const email = value?.trim().toLowerCase() ?? '';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new BadRequestException('Adresse email invalide');
    return email;
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    return `${salt}:${hash.toString('hex')}`;
  }
  private async verifyPassword(password: string, stored: string): Promise<boolean> {
    const [salt, expectedHex] = stored.split(':');
    if (!salt || !expectedHex) return false;
    const actual = (await scrypt(password, salt, 64)) as Buffer;
    const expected = Buffer.from(expectedHex, 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
}
