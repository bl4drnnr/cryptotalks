export interface GetPostBySlugPayload {
  slug: string;
}

interface IRate {
  username: string;
  userId: string;
  rate: '+' | '-';
}

interface IComment {
  userId: string;
  username: string;
  rate: Array<IRate>;
  payload: string;
  createdAt: Date;
}

export interface GetPostBySlugResponse {
  id: string;
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
