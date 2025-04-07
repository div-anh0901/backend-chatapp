import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({name:"conversations"})
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(()=> User, {createForeignKeyConstraints: true})
    creator: User;

    @OneToOne(()=> User, {createForeignKeyConstraints: true})
    recipient: User;
}