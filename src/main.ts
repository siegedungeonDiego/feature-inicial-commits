import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(() => {
    logger.log('Application is running on: http://localhost:3000');
  }).catch((error) => {
    logger.error('Failed to start the application', error);
  });
}
bootstrap();