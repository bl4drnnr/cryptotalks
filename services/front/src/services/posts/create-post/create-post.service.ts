import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { CreatePostPayload, CreatePostResponse } from '@services/posts/create-post/create-post.interface';

export const useCreatePostService = () => {
  const [loading, setLoading] = React.useState(false);

  const createPost = async (payload: CreatePostPayload)
    : Promise<CreatePostResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<CreatePostResponse>('/post/create-post', {
        title: payload.title,
        content: payload.content
      }, {
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

  return { createPost, loading };
};
