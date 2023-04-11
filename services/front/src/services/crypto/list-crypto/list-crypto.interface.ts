export interface ICoins {
  id: string;
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  volume24h: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  change: number;
  coinrankingUrl: string;
  sparkline: any;
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
  count: number;
  rows: ICoins[];
}
