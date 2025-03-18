import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Services } from '../utils/contants';
import { IAuthService } from './auth';
import { IUserService } from '../user/user';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(Services.USERS) private userService: IUserService 
    ){}

    @Post("register")
    validateUser(@Body() creaetUserDto: CreateUserDto){
        return this.userService.createUser(creaetUserDto)
    }

   @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Res() res: Response) {
        return res.send(HttpStatus.OK);
      }

      @Get('status')
    @UseGuards(AuthenticatedGuard)
    status(@Req() req: Request, @Res() res: Response) {
      
      res.send(req.user);
    }
}
