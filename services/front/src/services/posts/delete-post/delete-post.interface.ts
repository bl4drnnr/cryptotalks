export interface DeletePostPayload {
  postId: string;
  token: string | null;
  twoFaCode?: string | null;
  code?: string | null;
}

export interface DeletePostResponse {
  message: string;
}
