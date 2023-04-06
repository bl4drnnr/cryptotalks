import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { UpdatePostPayload, UpdatePostResponse } from '@services/posts/update-post/update-post.interface';

export const useUpdatePostService = () => {
  const [loading, setLoading] = React.useState(false);

  const updatePost = async (payload: UpdatePostPayload)
    : Promise<UpdatePostResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<UpdatePostResponse>(`/post/update/${payload.postId}`, {
        title: payload.title, content: payload.content
      }, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { updatePost, loading };
};
