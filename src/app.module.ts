import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './utils/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT!),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities: entities
    }),
    ConversationsModule,
    MessagesModule,
    GatewayModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
