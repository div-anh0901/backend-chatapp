import { User } from "src/utils/typeorm";
import { ValidateUserDetails } from "src/utils/types";

export interface IAuthService{
    validateUser(userCreadentials: ValidateUserDetails) :Promise<User| null>;
}