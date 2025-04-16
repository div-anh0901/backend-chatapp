import { Routes, Services } from '@/utils/contants';
import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ROUTES } from '@nestjs/core/router/router-module';
import { IMessageService } from './message';
import { AuthUser } from '@/utils/decorators';
import { User } from '@/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessageDto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.MESSAGES)
export class MessagesController {

    constructor(
        @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
        private eventEmitter: EventEmitter2,
    ){

    }

    @Post()
    async createMessage(
        @AuthUser() user: User,
        @Body() createMessageDto: CreateMessageDto
    ){
        const msg = await this.messageService.createMessage({...createMessageDto, user});
        this.eventEmitter.emit('message.create', msg);
        return msg;

    }

    @Get(':conversationId')
    getMessagesFromConversation(
        @AuthUser() user: User,
         @Param('conversationId',ParseIntPipe) conversationId: number,
    ) {
        return this.messageService.getMessagesByConversationId(conversationId);
    }

}
