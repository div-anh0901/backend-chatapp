import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Message } from "./Messages";


@Entity({name:"conversations"})
//@Index(['creator.id', 'recipient.id'])
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(()=> User, {createForeignKeyConstraints: false})
    @JoinColumn()
    creator: User;

    @OneToOne(()=> User, {createForeignKeyConstraints: false})
    @JoinColumn()
    recipient: User;


    @OneToMany(()=> Message, (message)=> message.conversation,{
        cascade:['insert','remove','update']
    })
    @JoinColumn()
    messages: Message[];

    @CreateDateColumn({name:"created_at"})
    createdAt: number;


    @OneToOne(()=> Message)
    @JoinColumn({name: 'last_message_sent'})
    lastMessageSent: Message;
}