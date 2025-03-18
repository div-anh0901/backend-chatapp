import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserModule } from '../../user/user.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../..//utils/typeorm';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[UserModule,
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
        
        ,TypeOrmModule.forFeature([User])],
      providers: [AuthService,

         {
                  provide: getRepositoryToken(User), // ✅ Mock the repository
                  useClass: Repository, // Use the Repository class
                },
      ],
      
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
