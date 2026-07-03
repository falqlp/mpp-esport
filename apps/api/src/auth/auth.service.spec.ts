import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service';

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
describe('AuthService', () => {
  it('registers, normalizes email and never exposes the password hash', async () => {
    const { service, prisma } = setup();
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockImplementation(async ({ data }) => ({ ...user, ...data, favoriteCompetitions: [] }));
    const session = await service.register({ email: ' A@B.COM ', displayName: 'Leo', password: 'password1' });
    expect(prisma.user.create).toHaveBeenCalled();
    expect(session.user).toEqual(expect.objectContaining({ email: 'a@b.com', favoriteCompetitions: [] }));
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
  it('rejects an invalid login', async () => {
    const { service, prisma } = setup();
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: user.email, password: 'bad' })).rejects.toBeInstanceOf(UnauthorizedException);
  });
  it('validates and persists favorite competitions', async () => {
    const { service, prisma } = setup();
    prisma.user.update.mockResolvedValue(user);
    await service.updateFavoriteCompetitions('u1', ['LEC', 'LEC']);
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { favoriteCompetitions: ['LEC'] } }),
    );
    await expect(service.updateFavoriteCompetitions('u1', ['INVALID'])).rejects.toBeInstanceOf(BadRequestException);
  });
});
