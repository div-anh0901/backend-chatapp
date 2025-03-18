import { User } from "src/utils/typeorm";
import { CreateUserDetails, FindUserParams } from "src/utils/types";


export interface IUserService{
    createUser(userDetail: CreateUserDetails):Promise<User>;
    findUser(findUserParams: FindUserParams) : Promise<User | null>;
    findUserByID(id: number) : Promise<User | null>;
    findUserByEmail(email: string) : Promise<User | null>;

}