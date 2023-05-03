export interface PostProps {
  slug: string;
  title: string;
  preview: string;
  searchTags: Array<string>;
  rates: Array<{ rate: '+' | '-'; userId: string; username: string; }>;
  createdAt?: string;
  isAdmin?: boolean;
  onDeleteClick?: () => void | never;
}
