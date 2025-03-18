export type CreateUserDetails = {
    email: string;
    password: string;
    username: string;
  };


  export type ValidateUserDetails = {
    email: string;
    password: string;
  }

  export type FindUserParams = Partial<{
    id: number;
    email: string;
  }>;