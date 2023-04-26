export interface LeaveCommentPayload {
  postId: string | undefined;
  comment: string;
  token: string | null;
}

export interface LeaveCommentResponse {
  message: string;
}
