export interface RatePostPayload {
  token: string | null;
  postId: string;
  rate: '+' | '-';
}

export interface RatePostResponse {
  message: string;
}
