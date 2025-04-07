import { Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({name:"conversations"})
//@Index(['creator.id', 'recipient.id'], { unique: true })
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(()=> User, {createForeignKeyConstraints: true})
    creator: User;

    @OneToOne(()=> User, {createForeignKeyConstraints: true})
    recipient: User;
}