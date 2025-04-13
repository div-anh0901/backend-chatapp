import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from '@/utils/typeorm';
import { Services } from '@/utils/contants';

@Module({
  imports:[TypeOrmModule.forFeature([Message,Conversation])],
  providers: [{
    provide:Services.MESSAGES,
    useClass: MessagesService
  }],
  controllers: [MessagesController],
  
})
export class MessagesModule {}
