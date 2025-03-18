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
          type: "mysql",
          host: process.env.MYSQL_DB_HOST,
          port: parseInt(process.env.MYSQL_DB_PORT!),
          username: process.env.MYSQL_DB_USERNAME,
          password: process.env.MYSQL_DB_PASSWORD,
          database: process.env.MYSQL_DB_NAME,
          synchronize: true,
          entities: [User]
        })
        ,TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
