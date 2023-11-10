import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { MinterGuard } from 'src/modules/shared/guards/minter.guard';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/mintable')
  async getMintableMember() {
    return await this.memberService.getMintableMembers();
  }

  @Post('/mint')
  @UseGuards(MinterGuard)
  async mint(@Body() body: any) {
    console.log(body);
  }
}
