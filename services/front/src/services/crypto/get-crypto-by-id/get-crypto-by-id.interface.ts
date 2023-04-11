export interface GetCryptoByIdPayload {
  cryptoId: string;
}

export interface GetCryptoByIdResponse {
  id: string;
  uuid: string;
  symbol: string;
  symbolId: string;
  name: string;
  description?: string;
  iconUrl: string;
  Volume24h: string;
  marketCap: string;
  price: number;
  btcPrice: number;
  change: number;
  coinrankingUrl: string;
  sparkline: Array<string>;
  rank: number;
  tier: number;
  createdAt: Date;
  updatedAt: Date;
}
