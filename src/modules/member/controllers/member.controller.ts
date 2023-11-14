import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { MinterGuard } from 'src/modules/shared/guards/minter.guard';
import { MintNFTRequest } from '../dtos/mint-nft.request.dto';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/mintable')
  async getMintableMember() {
    return await this.memberService.getMintableMembers();
  }

  @Post('/mint')
  @UseGuards(MinterGuard)
  async mint(@Body() body: MintNFTRequest) {
    return await this.memberService.mintMemberNFT(body.to);
  }
}
