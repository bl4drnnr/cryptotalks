import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { ListPostsPayload, ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';

export const useListPostsService = () => {
  const [loading, setLoading] = React.useState(false);

  const listPosts = async ({ page, pageSize, order, orderBy, searchQuery }: ListPostsPayload)
    : Promise<ListPostsResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/posts/list/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery || ''}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { listPosts, loading };
};
