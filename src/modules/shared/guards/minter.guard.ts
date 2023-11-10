import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { MemberNFTService } from 'src/services/member-nft.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MinterGuard implements CanActivate {
  constructor(private memberNFTService: MemberNFTService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //check if to available to mint
    const isMintable = await this.memberNFTService.isMintable(request.body.to);

    if (!isMintable) {
      throw new BadRequestException(`${request.body.to} is already minted NFT`);
    }

    const isKeyValid = await bcrypt.compare(
      request.body.minting_key,
      process.env.mkey,
    );

    if (!isKeyValid) {
      throw new UnauthorizedException(`invalid minting key`);
    }

    if (isMintable && isKeyValid) {
      return true;
    }
  }
}
