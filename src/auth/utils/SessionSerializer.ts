import { Injectable ,Inject} from "@nestjs/common";
import { PassportSerializer } from '@nestjs/passport';
import { use } from "passport";
import { IUserService } from "src/user/user";
import { UserService } from "src/user/user.service";
import { Services } from "src/utils/contants";
import { User } from "src/utils/typeorm";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(
        @Inject(Services.USERS) private readonly userService: IUserService
    ){
        super()
    }

    serializeUser(user: any, done: Function) {
        done(null, user)
    }

    async deserializeUser(payload: User, done: Function) {
        const userDb = await this.userService.findUserByID(payload.id);
        return userDb ? done(null, userDb) : done(null,null);
    }


}