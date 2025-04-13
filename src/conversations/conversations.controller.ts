import { Routes, Services } from '@/utils/contants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IConversationService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
import { User } from '@/utils/typeorm';
import { AuthUser } from '@/utils/decorators';

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(
        @Inject(Services.CONVERSATIONS)
        private readonly conversationsService: IConversationService
    ){}



    @Post()
    createConversation(@AuthUser() user: User,@Body() createConversationPayload:CreateConversationDto ){
        return this.conversationsService.createConversation(user,createConversationPayload);
    }

    @Get()
    async getConversations(@AuthUser() {id} : User){
        return this.conversationsService.getConversation(id);
    }

    @Get(":id")
    async getConversationById(@Param("id") id: number){
        const conversation = await this.conversationsService.findConversationById(id);
        return conversation
    }
}
