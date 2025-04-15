import { TypeormStore } from 'connect-typeorm';
import { DataSource, Repository } from 'typeorm';
import * as session from 'express-session';
import { Session } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export const sessionMiddleware = (dataSource: DataSource) => {
  const sessionRepository = dataSource.getRepository(Session);

  return session({
    store: new TypeormStore({
      cleanupLimit: 1,
      limitSubquery: false,

      ttl: 86400000, // Session expires in 1 day
    }).connect(sessionRepository),
    secret: '123456666', // Replace with your secret key
    resave: false,
    name:"CHAT_APP_SESSION_ID",
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  });
};

export class GetSessionRepository{
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  finOneIdCookie(id: any){

    return this.sessionRepository.findOneBy({id})
  }
}
