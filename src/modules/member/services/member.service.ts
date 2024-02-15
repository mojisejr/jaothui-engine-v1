import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { MemberNFTService } from 'src/services/member-nft.service';
import { Address } from 'src/types/address';
import { MintableResponse } from '../dtos/mintable.response.dto';
import { MintNFTResponse } from '../dtos/mint-nft.response.dto';

@Injectable()
export class MemberService {
  constructor(
    private memberRepo: MemberRepository,
    private memberNFTService: MemberNFTService,
  ) {}

  async getMintableMembers() {
    //find member
    const members = await this.memberRepo.getMemberWithWallet();
    if (!members) {
      throw new BadRequestException();
    }

    //filter out minted member
    const mintable = await Promise.all(
      members.map(async (member) => {
        const tokens = await this.memberNFTService.tokenOfOwnerAll(
          member.wallet as Address,
        );
        if (tokens.length <= 0) return member;
      }),
    );

    //clean undefined data
    const cleanData = mintable.filter((mintable) => mintable != undefined);
    console.log(cleanData);

    return {
      mintable: cleanData,
      count: cleanData.length,
    } as MintableResponse;
  }

  async mintMemberNFT(wallet: Address) {
    // const mintable = await this.memberNFTService.tokenOfOwnerAll(wallet);
    const isMintable = this.memberNFTService.isMintable(wallet);
    if (!isMintable) {
      throw new BadRequestException(`${wallet} has already minted!`);
    }

    const mintedWallet = await this.memberNFTService.mintNFT(wallet);

    return {
      wallet: mintedWallet ? mintedWallet : wallet,
      result: mintedWallet ? true : false,
    } as MintNFTResponse;
  }
}
