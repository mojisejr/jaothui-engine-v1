import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { bearerParser } from 'src/utils/bearer-parser';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers;
    const tokens = bearerParser(header.authorization as `Bearer ${string}`);
    if (tokens != process.env.key) {
      throw new UnauthorizedException();
    } else {
      next();
    }
  }
}
