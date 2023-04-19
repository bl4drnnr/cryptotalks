interface IPosts {
  id: string;
  title: string;
  preview: string;
  slug: string;
  createdAt: string;
  searchTags: Array<string>;
}

export interface ListPostsPayload {
  page: number;
  pageSize: number;
  order: string;
  orderBy: string;
  searchQuery?: string;
  username?: string;
  tags?: string;
}

export interface ListPostsResponse {
  count: number;
  rows: IPosts[];
}
