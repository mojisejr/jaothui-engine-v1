import { Injectable } from '@nestjs/common';
import { BitkubChainService } from './bitkub.service';
import { abi, address } from '../blockchain/member-nft/abi';
import { Address } from 'src/types/address';

@Injectable()
export class MemberNFTService {
  constructor(private bitkubService: BitkubChainService) {}

  tokenOfOwnerAll = async (wallet: Address) => {
    const data = (await this.bitkubService.getPublicClient().readContract({
      address,
      abi,
      functionName: 'tokenOfOwnerAll',
      args: [wallet],
    })) as bigint[];
    return data.map((d) => d.toString());
  };

  mintNFT = async (to: Address) => {
    const account = this.bitkubService.getAccount();
    const result = await this.bitkubService.getWalletClient().writeContract({
      account,
      address,
      abi,
      functionName: 'mintNFT',
      chain: this.bitkubService.chain,
      args: [to],
    });

    console.log(result);
    return result;
  };

  isMintable = async (to: Address) => {
    const found = await this.tokenOfOwnerAll(to);
    return found.length <= 0 ? true : false;
  };
}
