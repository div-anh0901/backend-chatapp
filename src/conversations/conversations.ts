import { Conversation, User } from "@/utils/typeorm";
import { CreateConversationParams } from "@/utils/types";


export interface IConversationService{

    createConversation( user:User,createConversation: CreateConversationParams);

    getConversation(id:number): Promise<Conversation[]>;

    findConversationById(id: number):Promise<Conversation>;
}