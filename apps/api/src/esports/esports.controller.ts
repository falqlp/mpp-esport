import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePredictionDto } from './esports.types';
import { EsportsService } from './esports.service';
import { MatchSyncService } from './match-sync.service';

@Controller('esports')
export class EsportsController {
  constructor(
    private readonly esportsService: EsportsService,
    private readonly matchSyncService: MatchSyncService,
  ) {}

  @Get('matches')
  getMatches() {
    return this.esportsService.getMatches();
  }

  @Get('predictions')
  getPredictions() {
    return this.esportsService.getPredictions();
  }

  @Post('predictions')
  createPrediction(@Body() dto: CreatePredictionDto) {
    return this.esportsService.createPrediction(dto);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.esportsService.getLeaderboard();
  }

  @Post('sync')
  syncMatches() {
    return this.matchSyncService.sync();
  }
}
