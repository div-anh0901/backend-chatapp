import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IConversationService } from './conversations';
import { CreateConversationParams } from '@/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User } from '@/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from '@/utils/contants';
import { IUserService } from '@/user/user';

@Injectable()
export class ConversationsService implements IConversationService {

    constructor(
        @InjectRepository(Conversation) private readonly conversationRepository:Repository<Conversation>,

        @Inject(Services.USERS) private readonly userService: IUserService
    ){}

   async getConversation(id: number): Promise<Conversation[]> {
       return this.conversationRepository.createQueryBuilder("converesation")
                .leftJoin('conversation.creator', "creator")
                .addSelect([
                    'creator.id',
                    'creator.username',
                    'creator.email'
                ])
                .leftJoin('conversation.recipient','recipient')
                .addSelect([
                    'recipient.id',
                    'recipient.username',
                    'recipient.email'
                ])
                .where('creator.id = :id', { id })
                .orWhere('recipient.id = :id', { id })
                .orderBy('conversation.id', 'DESC')
                .getMany();
        
   }

   async findConversationById(id: number): Promise<Conversation> {
        var find = await this.conversationRepository.findOneBy({"id": id});

        if (!find) {
            throw new NotFoundException(`Conversation with id ${id} not found`);
          }
       return  find;
   }

  async createConversation(user: User, params: CreateConversationParams) {
        const {recipientId} = params;
        if(user.id === recipientId){
            throw new HttpException('Cannot create Conversation', HttpStatus.BAD_REQUEST)
        }
        const existingConversation=await this.conversationRepository.findOne({
            where:[
                {
                    creator:{id: user.id},
                    recipient: {id: recipientId}
                },
                {
                    creator: {id: recipientId},
                    recipient: {id: user.id}
                }
            ]
        });

        if(existingConversation){
            throw new HttpException('Conversation exists', HttpStatus.CONFLICT);
        }


        const recipient = await this.userService.findUserByID(recipientId);


        if(!recipient){
            throw new HttpException('Recipient Not found', HttpStatus.BAD_REQUEST);
        }

        const conversation = this.conversationRepository.create({
            creator:user,
            recipient:recipient
        })
        return this.conversationRepository.save(
            conversation
        );
   }

}
