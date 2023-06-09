import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetCryptoByIdPayload, GetCryptoByIdResponse } from '@services/get-crypto-by-id/get-crypto-by-id.interface';

export const useGetCryptoByIdService = () => {
  const [loading, setLoading] = React.useState(false);

  const getCryptoById = async (payload: GetCryptoByIdPayload)
    : Promise<GetCryptoByIdResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetCryptoByIdResponse>(`/crypto/get/${payload.cryptoId}`, {
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

  return { getCryptoById, loading };
};
