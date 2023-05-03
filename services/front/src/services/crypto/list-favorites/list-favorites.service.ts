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
    username
  }: ListFavoritesPayload)
    : Promise<ListFavoritesResponse> => {
    try {
      setLoading(true);

      const queryParams = [];
      let listFavoritesUrl = `/crypto/list-favorites/${page}/${pageSize}/${order}/${orderBy}?`;

      if (username) queryParams.push({ username });

      if (queryParams.length) {
        queryParams.forEach((item) => {
          Object.entries(item).forEach(([key, value]) => {
            listFavoritesUrl += `${key}=${value}&`;
          });
        });
      }

      const { data } = await ApiClient.get(listFavoritesUrl, {
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
