import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class WalletUpdaterGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.body.minting_key) {
      throw new UnauthorizedException(`invalid minting key`);
    }
    const isKeyValid = await bcrypt.compare(
      request.body.minting_key,
      process.env.mkey,
    );

    if (!isKeyValid) {
      throw new UnauthorizedException(`invalid minting key`);
    }

    if (isKeyValid) {
      return true;
    }
  }
}
