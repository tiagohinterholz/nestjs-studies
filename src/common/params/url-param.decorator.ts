import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UrlParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return request.url;
  },
);
