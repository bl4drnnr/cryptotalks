interface IPosts {
  id: string;
  title: string;
}

export interface ListPostsPayload {
  page: number;
  pageSize: number;
  order: string;
  orderBy: string;
  searchQuery?: string;
  userId?: string;
}

export interface ListPostsResponse {
  count: number;
  posts: IPosts[];
}
