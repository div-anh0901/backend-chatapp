import { Conversation, Message, User } from '@/utils/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMessageService } from './message';
import { CreateMessageParams } from '@/utils/types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MessagesService implements IMessageService {

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversation) private readonly conversationResponsitoty: Repository<Conversation>
    ){
       
    }


    async createMessage({
        user,
        content,
        conversationId
    }): Promise<Message> {
        
        const conversation = await this.conversationResponsitoty.findOne({
            where:{id: conversationId},
            relations: ['creator', 'recipient']
        })

        if(!conversation)
            throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);

        const {creator, recipient} = conversation;


        

        if(creator.id !== user.id && recipient.id != user.id)
            throw new HttpException('Cannot Create Message', HttpStatus.FORBIDDEN);

      

     const newMessage =  this.messageRepository.create({
            content,
            conversation,
            author: instanceToPlain(user)
        })
        const savedMessage = await this.messageRepository.save(newMessage);
        conversation.lastMessageSent = savedMessage;
        await this.conversationResponsitoty.save(conversation);
        return savedMessage;
    }

getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
        relations: ['author'],
        where: { conversation: { id: conversationId } },
        order: { createdAt: 'DESC' },
      });
}

}
