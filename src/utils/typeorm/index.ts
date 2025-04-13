import { User } from './entities/User';
import { Session } from './entities/Sessions';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Messages';

const entities = [User, Session, Conversation,Message];

export default entities;

export { User, Session, Conversation,Message };
