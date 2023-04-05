interface ICoins {
  id: string;
  uuid: string;
  symbol: string;
  name: string;
  description?: string;
  iconUrl: string;
  sparkline: Array<string>;
  rank: number;
  tier: number;
}

export interface ListCryptoPayload {
  page: number;
  pageSize: number;
  order: string;
  orderBy: string;
  searchQuery?: string;
}

export interface ListCryptoResponse {
  coins: ICoins[];
}
