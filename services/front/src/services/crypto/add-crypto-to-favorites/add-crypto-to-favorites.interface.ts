export interface AddCryptoToFavoritesPayload {
  cryptoId: string | undefined;
  token: string | null;
}

export interface AddCryptoToFavoritesResponse {
  message: string;
}
