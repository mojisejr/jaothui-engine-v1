import {
  Chain,
  HttpTransport,
  createPublicClient,
  createWalletClient,
  http,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Injectable } from '@nestjs/common';
import { type Address } from 'src/types/address';
import { bitkubMainnet } from 'src/blockchain/chain';

@Injectable()
export class BitkubChainService {
  private account = privateKeyToAccount(process.env.bkey as Address);
  public chain: Chain = bitkubMainnet;
  public transport: HttpTransport = http();

  getPublicClient() {
    return createPublicClient({ chain: this.chain, transport: this.transport });
  }

  getWalletClient() {
    return createWalletClient({
      chain: this.chain,
      transport: this.transport,
      account: this.account,
    });
  }

  getAccount() {
    return this.account;
  }
}
