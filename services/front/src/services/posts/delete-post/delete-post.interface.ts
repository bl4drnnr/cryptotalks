export interface DeletePostPayload {
  postId: string;
  token: string | null;
}

export interface DeletePostResponse {
  message: string;
}
