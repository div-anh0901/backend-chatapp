import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserModule } from '../../user/user.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../utils/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let repository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[UserModule,
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
        TypeOrmModule.forFeature([User])
      ],
      controllers: [AuthController],
      providers:[
        AuthService,
        {
          provide: getRepositoryToken(User), // ✅ Mock the repository
          useClass: Repository, // Use the Repository class
        },
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
