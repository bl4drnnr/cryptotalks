export interface RemoveCryptoFromFavoritesPayload {
  cryptoId: string;
  token: string | null;
}

export interface RemoveCryptoFromFavoritesResponse {
  message: string;
}
