import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://kwaithai.com',
      'https://jaothui.com',
    ],
  });
  app.use(helmet());
  app.use(csurf());
  await app.listen(3000);
}
bootstrap();
