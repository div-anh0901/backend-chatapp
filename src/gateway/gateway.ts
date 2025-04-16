import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import { Message } from '../utils/typeorm';
import { Services } from '@/utils/contants';
import { IGatewaySession } from './gatewat.session';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
    withCredentials: true
  },
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly sessions: IGatewaySession,
  ) {}
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('New Incoming Connection');
    console.log(socket.user);
    if(socket.user != undefined){
      this.sessions.setUserSocket(socket.user.id, socket);
    }
    socket.emit('connected', { status: 'good' });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }

  
  @OnEvent('message.create')
  handleMessageCreateEvent(payload: Message) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload;

    const authorSocket = this.sessions.getUserSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);

       if(recipientSocket != undefined){
          recipientSocket.emit('onMessage', payload);
       }
      authorSocket.emit('onMessage', payload);
  }
}