import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        name: 'Luiz',
        lastName: 'Otávio',
        role: 'admin',
      };
    }
    res.setHeader('X-Custom-Header', 'The Value of header');
    // return res.status(404).send({
    //   message: 'Not found',
    // });
    next();

    res.on('finish', () => {
      console.log('Conection Finish!');
    });
  }
}
