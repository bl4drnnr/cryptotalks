export interface GetPostBySlugPayload {
  slug: string;
}

export interface GetPostBySlugResponse {
  title: string;
  content: Array<string>;
}
