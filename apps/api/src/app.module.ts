import { Module } from '@nestjs/common';
import { EsportsController } from './esports/esports.controller';
import { EsportsService } from './esports/esports.service';
import { PrismaService } from './prisma.service';
import { PandaScoreService } from './esports/pandascore.service';
import { MatchSyncService } from './esports/match-sync.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AuthController, EsportsController],
  providers: [EsportsService, MatchSyncService, PandaScoreService, PrismaService, AuthService],
})
export class AppModule {}
