import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { EsportsController } from './esports/esports.controller';
import { EsportsService } from './esports/esports.service';
import { PrismaService } from './prisma.service';
import { PandaScoreService } from './esports/pandascore.service';
import { MatchSyncService } from './esports/match-sync.service';
import { RequestLoggingInterceptor } from './request-logging.interceptor';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AuthController, EsportsController],
  providers: [
    EsportsService,
    MatchSyncService,
    PandaScoreService,
    PrismaService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: RequestLoggingInterceptor },
  ],
})
export class AppModule {}
