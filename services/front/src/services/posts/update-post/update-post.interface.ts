export interface UpdatePostPayload {
  postId: string;
  title?: string;
  content?: Array<string>;
  preview?: string;
  searchTags?: Array<string>;
  token: string | null;
}

export interface UpdatePostResponse {
  message: string;
}
