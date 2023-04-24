export interface GetPostBySlugPayload {
  slug: string;
}

interface IRate {
  userId: string;
  rate: '+' | '-';
}

interface IComment {
  userId: string;
  rate: Array<IRate>;
  payload: string;
  createdAt: Date;
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
  postInfo: {
    rates: Array<IRate>;
    comments: Array<IComment>;
  }
}
