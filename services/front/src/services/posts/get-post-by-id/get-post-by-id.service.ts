import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetPostByIdPayload, GetPostByIdResponse } from '@services/posts/get-post-by-id/get-post-by-id.interface';

export const useGetPostById = () => {
  const [loading, setLoading] = React.useState(false);

  const getPostById = async (payload: GetPostByIdPayload)
    : Promise<GetPostByIdResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get(`/post/get/${payload.postId}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getPostById, loading };
};
