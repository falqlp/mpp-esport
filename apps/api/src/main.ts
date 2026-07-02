import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [/^http:\/\/(localhost|127\.0\.0\.1):4200$/],
  });

  await app.listen(3000);
  Logger.log('API disponible sur http://localhost:3000/api', 'Bootstrap');
}

void bootstrap();
