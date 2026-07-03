import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreatePredictionDto } from './esports.types';
import { EsportsService } from './esports.service';
import { MatchSyncService } from './match-sync.service';

@Controller('esports')
export class EsportsController {
  constructor(
    private readonly esportsService: EsportsService,
    private readonly matchSyncService: MatchSyncService,
    private readonly auth: AuthService,
  ) {}

  @Get('matches')
  getMatches() {
    return this.esportsService.getMatches();
  }

  @Get('predictions')
  async getPredictions(@Headers('authorization') authorization?: string) {
    const user = await this.auth.authenticate(authorization);
    return user ? this.esportsService.getPredictions(user.id) : [];
  }

  @Post('predictions')
  async createPrediction(@Body() dto: CreatePredictionDto, @Headers('authorization') authorization?: string) {
    const user = this.auth.requireUser(await this.auth.authenticate(authorization));
    return this.esportsService.createPrediction(dto, user);
  }

  @Post('sync')
  async syncMatches(@Headers('authorization') authorization?: string) {
    this.auth.requireUser(await this.auth.authenticate(authorization));
    return this.matchSyncService.sync();
  }

  @Get('sync/status')
  async getSyncStatus(@Headers('authorization') authorization?: string) {
    this.auth.requireUser(await this.auth.authenticate(authorization));
    return this.matchSyncService.getStatus();
  }
}
