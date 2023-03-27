import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { DeletePostPayload, DeletePostResponse } from '@services/posts/delete-post/delete-post.interface';

export const useDeletePostService = () => {
  const [loading, setLoading] = React.useState(false);

  const deletePost = async (payload: DeletePostPayload)
    : Promise<DeletePostResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.delete<DeletePostResponse>(`/post/delete/${payload.postId}`, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading };
};
