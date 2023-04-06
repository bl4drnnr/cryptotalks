interface IPosts {
  id: string;
  title: string;
  preview: string;
  searchTags: Array<string>;
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
  rows: IPosts[];
}
