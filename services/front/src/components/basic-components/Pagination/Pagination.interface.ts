export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (e: number) => void;
  onPageSizeChange: (e: number) => void;
}
