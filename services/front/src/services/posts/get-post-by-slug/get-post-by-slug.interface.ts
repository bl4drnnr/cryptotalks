export interface GetPostBySlugPayload {
  slug: string;
}

export interface GetPostBySlugResponse {
  title: string;
  slug: string;
  preview: string;
  content: Array<string>;
  searchTags: Array<string>;
  userId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
