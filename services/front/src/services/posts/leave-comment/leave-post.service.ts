import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { LeaveCommentPayload, LeaveCommentResponse } from '@services/posts/leave-comment/leave-post.interface';

export const useLeaveCommentService = () => {
  const [loading, setLoading] = React.useState(false);

  const leaveComment = async (payload: LeaveCommentPayload)
    : Promise<LeaveCommentResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<LeaveCommentResponse>(`/post/comment/${payload.postId}`, {
        comment: payload.comment
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

  return { leaveComment, loading };
};
