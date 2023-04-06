export interface LeaveCommentPayload {
  postId: string;
  comment: string;
  token: string | null;
}

export interface LeaveCommentResponse {
  message: string;
}
