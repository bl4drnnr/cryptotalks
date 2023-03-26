export interface GetPostByIdPayload {
  postId: string;
}

export interface GetPostByIdResponse {
  title: string;
  content: Array<string>;
}
