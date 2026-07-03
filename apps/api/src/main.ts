import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRuntimeConfig } from './runtime-config';

async function bootstrap() {
  const config = getRuntimeConfig(process.env);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [config.webOrigin, /^http:\/\/(localhost|127\.0\.0\.1):4200$/],
  });

  await app.listen(config.port, config.host);
  Logger.log(`API disponible sur ${config.host}:${config.port}/api`, 'Bootstrap');
}

void bootstrap();
