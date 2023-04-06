import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import {
  RemoveCryptoFromFavoritesPayload, RemoveCryptoFromFavoritesResponse
} from '@services/remove-crypto-from-favorites/remove-crypto-from-favorites.interface';

export const useRemoveCryptoFromFavoritesService = () => {
  const [loading, setLoading] = React.useState(false);

  const removeCryptoFromFavorites = async (payload: RemoveCryptoFromFavoritesPayload)
    : Promise<RemoveCryptoFromFavoritesResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.delete<RemoveCryptoFromFavoritesResponse>(`/crypto/remove-favorites/${payload.cryptoId}`, {
        headers: {
          'x-access-token': `Bearer ${payload.token}`
        }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { removeCryptoFromFavorites, loading };
};
