export interface CreatePostPayload {
  token: string | null;
  title: string;
  content: Array<string>;
  preview: string;
  searchTags: Array<string>;
}

export interface CreatePostResponse {
  message: string;
}
