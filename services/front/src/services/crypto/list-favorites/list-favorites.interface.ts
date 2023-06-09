import { ICoins } from '@services/list-crypto/list-crypto.interface';

export interface ListFavoritesPayload {
  page: number;
  pageSize: number;
  order: string;
  orderBy: string;
  username?: string;
  token?: string | null;
}

export interface ListFavoritesResponse {
  count: number;
  rows: ICoins[];
}
