export interface UpdatePostPayload {
  postId: string;
  title: string | null;
  content: Array<string> | null;
  token: string | null;
}

export interface UpdatePostResponse {
  message: string;
}
