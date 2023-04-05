export interface AddCryptoToFavoritesPayload {
  cryptoId: string;
  token: string | null;
}

export interface AddCryptoToFavoritesResponse {
  message: string;
}
