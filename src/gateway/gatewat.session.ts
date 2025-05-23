import { AuthenticatedSocket } from "@/utils/interfaces";
import { Injectable } from "@nestjs/common";

export interface IGatewaySession{
    getUserSocket(id: number);
  setUserSocket(id: number, socket: AuthenticatedSocket): void;
  removeUserSocket(id: number): void;
  getSockets(): Map<number, AuthenticatedSocket>;
}


@Injectable()
export class GatewaySessionManager implements IGatewaySession{
    private readonly sessions :Map<number,AuthenticatedSocket> = new Map();

    getUserSocket(id: number) {
        return this.sessions.get(id)
    }

    setUserSocket(userId: number, socket: AuthenticatedSocket) {
        this.sessions.set(userId, socket);
      }
      removeUserSocket(userId: number) {
        this.sessions.delete(userId);
      }
      getSockets(): Map<number, AuthenticatedSocket> {
        return this.sessions;
      }
}