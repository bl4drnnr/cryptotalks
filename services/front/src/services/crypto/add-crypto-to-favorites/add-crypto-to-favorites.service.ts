import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import {
  AddCryptoToFavoritesPayload,
  AddCryptoToFavoritesResponse
} from '@services/add-crypto-to-favorites/add-crypto-to-favorites.interface';

export const useAddCryptoToFavoritesService = () => {
  const [loading, setLoading] = React.useState(false);

  const addCryptoToFavorite = async (payload: AddCryptoToFavoritesPayload)
    : Promise<AddCryptoToFavoritesResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<AddCryptoToFavoritesResponse>(`/crypto/add-favorites/${payload.cryptoId}`, {}, {
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

  return { addCryptoToFavorite, loading };
};
