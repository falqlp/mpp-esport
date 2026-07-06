import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { AuthService, COMPETITION_KEYS } from './auth.service';

const user = {
  id: 'u1',
  email: 'a@b.com',
  displayName: 'Leo',
  passwordHash: '',
  favoriteCompetitions: ['LEC'],
  createdAt: new Date(),
};
function setup() {
  const prisma = { user: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() } };
  return { prisma, service: new AuthService(prisma as never) };
}

function signedToken(data: unknown) {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = createHmac('sha256', process.env.AUTH_SECRET ?? 'dev-only-change-me')
    .update(payload)
    .digest('base64url');
  return `${payload}.${signature}`;
}

describe('AuthService', () => {
  it('registers, normalizes email and never exposes the password hash', async () => {
    const { service, prisma } = setup();
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockImplementation(async ({ data }) => ({ ...user, ...data }));
    const session = await service.register({ email: ' A@B.COM ', displayName: 'Leo', password: 'password1' });
    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ favoriteCompetitions: [...COMPETITION_KEYS] }) }),
    );
    expect(session.user).toEqual(
      expect.objectContaining({ email: 'a@b.com', favoriteCompetitions: [...COMPETITION_KEYS] }),
    );
    expect(session.user).not.toHaveProperty('passwordHash');
  });
  it('rejects invalid registration and duplicate emails', async () => {
    const { service, prisma } = setup();
    await expect(service.register({ email: 'bad', displayName: 'L', password: 'x' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    prisma.user.findUnique.mockResolvedValue(user);
    await expect(
      service.register({ email: user.email, displayName: 'Leo', password: 'password1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects a short display name or password', async () => {
    const { service } = setup();
    await expect(
      service.register({ email: user.email, displayName: 'L', password: 'password1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(service.register({ email: user.email, displayName: 'Leo', password: 'short' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('logs in with the correct password and rejects incorrect or malformed hashes', async () => {
    const { service, prisma } = setup();
    let createdUser = user;
    prisma.user.findUnique.mockResolvedValueOnce(null);
    prisma.user.create.mockImplementation(async ({ data }) => {
      createdUser = { ...user, ...data };
      return createdUser;
    });
    await service.register({ email: user.email, displayName: user.displayName, password: 'password1' });

    prisma.user.findUnique.mockResolvedValue(createdUser);
    await expect(service.login({ email: user.email, password: 'password1' })).resolves.toEqual(
      expect.objectContaining({ user: expect.objectContaining({ id: user.id }) }),
    );
    await expect(service.login({ email: user.email, password: 'incorrect' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    prisma.user.findUnique.mockResolvedValue({ ...createdUser, passwordHash: 'malformed' });
    await expect(service.login({ email: user.email, password: 'password1' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('rejects an invalid login', async () => {
    const { service, prisma } = setup();
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: user.email, password: 'bad' })).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('authenticates a valid bearer token', async () => {
    const { service, prisma } = setup();
    prisma.user.findUnique.mockResolvedValue(user);
    const token = signedToken({ sub: user.id, exp: Date.now() + 60_000 });

    await expect(service.authenticate(`Bearer ${token}`)).resolves.toEqual({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      favoriteCompetitions: user.favoriteCompetitions,
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id } });
  });

  it('rejects missing, malformed, tampered, and expired bearer tokens', async () => {
    const { service, prisma } = setup();

    await expect(service.authenticate()).resolves.toBeUndefined();
    await expect(service.authenticate('Basic credentials')).resolves.toBeUndefined();
    await expect(service.authenticate('Bearer malformed')).resolves.toBeUndefined();

    const validToken = signedToken({ sub: user.id, exp: Date.now() + 60_000 });
    const [payload, signature] = validToken.split('.');
    const tamperedSignature = `${signature.slice(0, -1)}${signature.endsWith('a') ? 'b' : 'a'}`;
    await expect(service.authenticate(`Bearer ${payload}.${tamperedSignature}`)).resolves.toBeUndefined();

    await expect(
      service.authenticate(`Bearer ${signedToken({ sub: user.id, exp: Date.now() - 1 })}`),
    ).resolves.toBeUndefined();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it('rejects a signed invalid payload and a token for a missing user', async () => {
    const { service, prisma } = setup();
    const invalidPayload = Buffer.from('{invalid json').toString('base64url');
    const signature = createHmac('sha256', process.env.AUTH_SECRET ?? 'dev-only-change-me')
      .update(invalidPayload)
      .digest('base64url');
    await expect(service.authenticate(`Bearer ${invalidPayload}.${signature}`)).resolves.toBeUndefined();

    prisma.user.findUnique.mockResolvedValue(null);
    await expect(
      service.authenticate(`Bearer ${signedToken({ sub: 'missing', exp: Date.now() + 60_000 })}`),
    ).resolves.toBeUndefined();
  });

  it('requires an authenticated user', () => {
    const { service } = setup();
    expect(service.requireUser(user)).toBe(user);
    expect(() => service.requireUser()).toThrow(UnauthorizedException);
  });

  it('validates and persists favorite competitions', async () => {
    const { service, prisma } = setup();
    prisma.user.update.mockResolvedValue(user);
    await service.updateFavoriteCompetitions('u1', ['LEC', 'LEC']);
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { favoriteCompetitions: ['LEC'] } }),
    );
    await expect(service.updateFavoriteCompetitions('u1', ['INVALID'])).rejects.toBeInstanceOf(BadRequestException);
    await expect(service.updateFavoriteCompetitions('u1', [1])).rejects.toBeInstanceOf(BadRequestException);
    await expect(service.updateFavoriteCompetitions('u1', undefined)).rejects.toBeInstanceOf(BadRequestException);
  });
});
