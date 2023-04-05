interface ICoins {

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
