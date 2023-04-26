import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { RateCommentPayload, RateCommentResponse } from '@services/posts/rate-comment/rate-comment.interface';

export const useRateCommentService = () => {
  const [loading, setLoading] = React.useState(false);

  const rateComment = async (payload: RateCommentPayload)
    : Promise<RateCommentResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<RateCommentResponse>(
        `/post/rate/comment/${payload.postId}/${payload.commentId}`, { rate: payload.rate },
        { headers: { 'x-access-token': `Bearer ${payload.token}` } }
      );

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { rateComment, loading };
};
