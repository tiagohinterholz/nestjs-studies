// src/common/interfaces/auth-request.interface.ts
import { Request } from 'express';
import { RequestUser } from './request-user.interface';

export interface AuthRequest extends Request {
  user: RequestUser;
}
