import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../utils/typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: "localhost",
          port:  3306,
          username: "root",
          password: "12345678",
          database: "chat_app",
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
