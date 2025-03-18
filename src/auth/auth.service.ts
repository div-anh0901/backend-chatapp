import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/contants';
import { IUserService } from 'src/user/user';
import { ValidateUserDetails } from 'src/utils/types';
import { comparePassword } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(Services.USERS) private readonly userService: IUserService
    ){
        
    }

    async validateUser(userCreadentials: ValidateUserDetails){
        const user = await this.userService.findUserByEmail(userCreadentials.email);

        if(!user){
            throw new HttpException('Invalid Credentials', HttpStatus.NOT_ACCEPTABLE);
        }
        const isPasswordValid = await comparePassword(userCreadentials.password, user.password);

        if(isPasswordValid == false){
            throw new HttpException('Password incorrect!', HttpStatus.NOT_ACCEPTABLE);
        }
        return user;
    }
}
