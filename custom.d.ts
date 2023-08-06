import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string;
        userId: string
      };
      username: string;
    }
  }
}