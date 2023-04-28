import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { ListFavoritesPayload, ListFavoritesResponse } from '@services/list-favorites/list-favorites.interface';

export const useListFavoritesService = () => {
  const [loading, setLoading] = React.useState(false);

  const listFavorites = async ({
    page,
    pageSize,
    order,
    orderBy,
    token,
    userId
  }: ListFavoritesPayload)
    : Promise<ListFavoritesResponse> => {
    try {
      setLoading(true);
      const requestUrl = `/crypto/list-favorites/${page}/${pageSize}/${order}/${orderBy}/${userId}`;
      const { data } = await ApiClient.get(requestUrl, {
        headers: {
          'x-access-token': `Bearer ${token}`
        }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { listFavorites, loading };
};
