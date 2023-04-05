export interface LeavePostPayload {
  postId: string;
  comment: string;
  token: string | null;
}

export interface LeavePostResponse {
  message: string;
}
