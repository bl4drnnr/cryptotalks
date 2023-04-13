import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { RatePostPayload, RatePostResponse } from '@services/posts/rate-post/rate-post.interface';

export const useRatePostService = () => {
  const [loading, setLoading] = React.useState(false);

  const ratePost = async (payload: RatePostPayload)
    : Promise<RatePostResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<RatePostResponse>(
        `/post/rate/post/${payload.postId}`, { rate: payload.rate },
        { headers: { 'x-access-token': `Bearer ${payload.token}` } }
      );

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { ratePost, loading };
};
