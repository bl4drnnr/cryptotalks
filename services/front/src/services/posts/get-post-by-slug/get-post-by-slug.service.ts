import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetPostBySlugPayload, GetPostBySlugResponse } from '@services/posts/get-post-by-slug/get-post-by-slug.interface';

export const useGetPostBySlug = () => {
  const [loading, setLoading] = React.useState(false);

  const getPostBySlug = async (payload: GetPostBySlugPayload)
    : Promise<GetPostBySlugResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetPostBySlugResponse>(`/post/get/${payload.slug}${payload.toEdit ? '&toEdit=yes' : ''}`, {
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

  return { getPostBySlug, loading };
};
