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
}

export interface ListPostsResponse {
  posts: IPosts[];
}
