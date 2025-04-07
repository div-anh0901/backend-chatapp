import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetails, FindUserParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';
import { hashPassword } from '../utils/helpers';
@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}
      async createUser(userDetails: CreateUserDetails) {
        const existingUser = await this.userRepository.findOneBy({
          email: userDetails.email,
        });
        if (existingUser)
          throw new HttpException('User already exists', HttpStatus.CONFLICT);
        const password = await hashPassword(userDetails.password);
        const newUser = this.userRepository.create({ ...userDetails, password });
        return this.userRepository.save(newUser);
      }

      async findUser(findUserParams: FindUserParams): Promise<User|null> {
        return this.userRepository.findOneBy({
            id: findUserParams.id,
            email: findUserParams.email
        });
      }
      async findUserByID(id: number): Promise<User | null> {
          return  this.userRepository.findOneBy({id});
      }

      findUserByEmail(email: string): Promise<User | null> {
        return  this.userRepository.findOneBy({email});
      }
}
