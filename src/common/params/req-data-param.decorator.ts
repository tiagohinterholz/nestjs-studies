import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReqDataParam = createParamDecorator(
  (data: keyof Request, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return request[data];
  },
);
