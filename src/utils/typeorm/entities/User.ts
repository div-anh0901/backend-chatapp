import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Messages';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;
  
  @Column()
  @Exclude()
  password: string;


  @OneToMany(()=> Message, (message)=> message.author)
  @JoinColumn()
  messages: Message[]
}

