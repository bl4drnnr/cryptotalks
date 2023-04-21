export interface RemoveCryptoFromFavoritesPayload {
  cryptoId: string | undefined;
  token: string | null;
}

export interface RemoveCryptoFromFavoritesResponse {
  message: string;
}
