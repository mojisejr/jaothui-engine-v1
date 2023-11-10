import { Address } from 'src/types/address';

export interface MintableResponse {
  mintable: { wallet: Address | string; role: string }[];
  count: number;
}
