import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from '@/utils/contants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '@/utils/typeorm';
import { UserModule } from '@/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Conversation]) , UserModule],
  controllers: [ConversationsController],
  providers: [ 
    {
      provide: Services.CONVERSATIONS,
      useClass:ConversationsService
    }
  ]
})
export class ConversationsModule {}
