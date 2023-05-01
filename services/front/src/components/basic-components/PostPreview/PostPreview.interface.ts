export interface PostProps {
  slug: string;
  title: string;
  preview: string;
  searchTags: Array<string>;
  createdAt?: string;
  isAdmin?: boolean;
  onDeleteClick?: () => void | never;
}
