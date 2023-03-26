export interface CreatePostPayload {
  token: string | null;
  title: string;
  content: Array<string>;
}

export interface CreatePostResponse {
  message: string;
}
