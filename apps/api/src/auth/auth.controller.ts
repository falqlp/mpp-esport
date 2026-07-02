import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register') register(@Body() body: { email?: string; displayName?: string; password?: string }) { return this.auth.register(body); }
  @Post('login') login(@Body() body: { email?: string; password?: string }) { return this.auth.login(body); }
  @Get('me') async me(@Headers('authorization') authorization?: string) {
    const user = await this.auth.authenticate(authorization);
    if (!user) throw new UnauthorizedException('Session invalide');
    return user;
  }
}
