export interface GetPostBySlugPayload {
  slug: string;
  token: string | null;
  toEdit?: boolean;
}

interface IRate {
  username: string;
  rate: '+' | '-';
  rated: boolean;
}

interface IComment {
  id: string;
  userId: string;
  username: string;
  commentRates: Array<IRate>;
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
