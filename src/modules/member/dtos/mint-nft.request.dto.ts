import { Address } from 'src/types/address';

export interface MintNFTRequest {
  to: Address;
  minter_key: string;
}
