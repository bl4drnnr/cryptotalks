import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { ListPostsPayload, ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';

export const useListPostsService = () => {
  const [loading, setLoading] = React.useState(false);

  const listPosts = async ({ page, pageSize, order, orderBy, searchQuery, username }: ListPostsPayload)
    : Promise<ListPostsResponse> => {
    try {
      setLoading(true);

      const queryParams = [];
      let listPostsPath = `/post/list/${page}/${pageSize}/${order}/${orderBy}?`;

      if (searchQuery) queryParams.push({ searchQuery });
      if (username) queryParams.push({ username });

      if (queryParams.length) {
        queryParams.forEach((item) => {
          Object.entries(item).forEach(([key, value]) => {
            listPostsPath += `${key}=${value}&`;
          });
        });
      }

      const { data } = await ApiClient.get<ListPostsResponse>(listPostsPath);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { listPosts, loading };
};
