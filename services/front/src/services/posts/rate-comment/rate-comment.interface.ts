export interface RateCommentPayload {
  token: string | null;
  commentId: string;
  rate: '+' | '-';
}

export interface RateCommentResponse {
  message: string;
}
