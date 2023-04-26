export interface RateCommentPayload {
  token: string | null;
  commentId: string;
  postId: string | undefined;
  rate: '+' | '-';
}

export interface RateCommentResponse {
  message: string;
}
