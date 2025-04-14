import { Routes, Services } from '@/utils/contants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ROUTES } from '@nestjs/core/router/router-module';
import { IMessageService } from './message';
import { AuthUser } from '@/utils/decorators';
import { User } from '@/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessageDto';

@Controller(Routes.MESSAGES)
export class MessagesController {

    constructor(
        @Inject(Services.MESSAGES) private readonly messageService: IMessageService
    ){

    }

    @Post()
    createMessage(
        @AuthUser() user: User,
        @Body() createMessageDto: CreateMessageDto
    ){
        return this.messageService.createMessage({...createMessageDto, user});
    }

    @Get(':conversationId')
    getMessagesFromConversation(
        @AuthUser() user: User,
         @Param('conversationId') conversationId: number,
    ) {
        return this.messageService.getMessagesByConversationId(conversationId);
    }

}
