import { AuthenticatedSocket } from "@/utils/interfaces";
import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { DataSource } from "typeorm";
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from "class-transformer";
import { Session, User } from "@/utils/typeorm";

export class WebsocketAdapter extends IoAdapter{
    constructor(
        private app: INestApplicationContext, // get app context
      ) {
        super(app);
      }
    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port,options);
        const dataSource = this.app.get(DataSource); // Get TypeORM DataSource
        const sessionRepository = dataSource.getRepository(Session);
        server.use(async (socket: AuthenticatedSocket,next)=>{
            const { cookie: clientCookie } = socket.handshake.headers;
            if (!clientCookie) {
              return next(new Error('Not Authenticated. No cookies were sent'));
            }
            const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
            
            if (!CHAT_APP_SESSION_ID) {
              return next(new Error('Not Authenticated'));
            }
            const signedCookie = cookieParser.signedCookie(
              CHAT_APP_SESSION_ID,
              process.env.COOKIE_SECRET,
            );
            if (!signedCookie) return next(new Error('Error signing cookie'));
            const sessionDB = await sessionRepository.findOneBy({id:signedCookie });
            if(sessionDB != null){
                const userDB = plainToInstance(
                    User,
                    JSON.parse(sessionDB.json).passport.user,
                  );
                  socket.user = userDB;
            }
            next()
        })

        return server;
    }
}