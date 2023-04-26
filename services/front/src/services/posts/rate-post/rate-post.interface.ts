export interface RatePostPayload {
  token: string | null;
  postId: string | undefined;
  rate: '+' | '-';
}

export interface RatePostResponse {
  message: string;
}
