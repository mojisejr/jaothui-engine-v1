import { Module } from '@nestjs/common';
import { BitkubChainService } from 'src/services/bitkub.service';
import { MemberNFTService } from 'src/services/member-nft.service';
import { MemberController } from './controllers/member.controller';
import { MemberService } from './services/member.service';
import { MemberRepository } from './repositories/member.repository';

@Module({
  imports: [],
  exports: [],
  controllers: [MemberController],
  providers: [
    BitkubChainService,
    MemberNFTService,
    MemberService,
    MemberRepository,
  ],
})
export class MemberModule {}
