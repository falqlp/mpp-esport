import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { join } from 'node:path';

config({ path: join(__dirname, '..', '.env') });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    const startedAt = Date.now();
    this.logger.log('Connexion à PostgreSQL…');
    await this.$connect();
    this.logger.log(`PostgreSQL connecté en ${Date.now() - startedAt}ms`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
