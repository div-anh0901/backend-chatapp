import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import * as session from 'express-session';
import { Session } from 'src/utils/typeorm';

export const sessionMiddleware = (dataSource: DataSource) => {
  const sessionRepository = dataSource.getRepository(Session);

  return session({
    store: new TypeormStore({
      cleanupLimit: 1,
      limitSubquery: false,
      ttl: 86400000, // Session expires in 1 day
    }).connect(sessionRepository),
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  });
};
