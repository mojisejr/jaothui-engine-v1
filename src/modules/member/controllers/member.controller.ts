import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { MinterGuard } from 'src/modules/shared/guards/minter.guard';
import { MintNFTRequest } from '../dtos/mint-nft.request.dto';
import { UpdateWalletRequest } from '../dtos/update-wallet.request.dto';
import { WalletUpdaterGuard } from 'src/modules/shared/guards/wallet-update.guard';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/:memberId')
  async getMemberById(@Param('memberId') memberId: string) {
    return await this.memberService.getMemberById(memberId);
  }

  @Get('/mintable')
  async getMintableMember() {
    return await this.memberService.getMintableMembers();
  }

  @Post('/mint')
  @UseGuards(MinterGuard)
  async mint(@Body() body: MintNFTRequest) {
    return await this.memberService.mintMemberNFT(body.to);
  }

  @Post('/updateWallet')
  @UseGuards(WalletUpdaterGuard)
  async updateMemberIdToWallet(@Body() body: UpdateWalletRequest) {
    return await this.memberService.updateMemberIdToWallet(
      body.memberId,
      body.wallet,
    );
  }
}
