
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @MaxLength(108)
    username: string;
  
    @IsNotEmpty()
    @MaxLength(32)
    password: string;
  }