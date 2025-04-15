import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { DataSource } from 'typeorm';
import { sessionMiddleware } from './middleware/sessionMiddleware';
import * as session from 'express-session';
import * as passport from 'passport';
import { WebsocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const adapter = new WebsocketAdapter(app);

  
  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix("api")
  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(sessionMiddleware(dataSource))
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
