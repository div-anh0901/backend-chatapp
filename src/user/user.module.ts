import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Services } from '../utils/contants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../utils/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService
    }
  ],
  exports:[
    {
      provide: Services.USERS,
      useClass: UserService
    }
  ]
})
export class UserModule {}
