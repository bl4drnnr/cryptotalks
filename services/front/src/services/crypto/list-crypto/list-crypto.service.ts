import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { ListCryptoPayload, ListCryptoResponse } from '@services/list-crypto/list-crypto.interface';

export const useListCryptoService = () => {
  const [loading, setLoading] = React.useState(false);

  const listCrypto = async ({ page, pageSize, order, orderBy, searchQuery }: ListCryptoPayload)
    : Promise<ListCryptoResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<ListCryptoResponse>(
        `/crypto/list/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery || ''}`
      );

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { listCrypto, loading };
};

