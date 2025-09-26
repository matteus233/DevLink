// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
