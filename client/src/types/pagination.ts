export type PageType = 'authors' | 'blogs';

export interface PaginationResponse<T> {
  totalItem: number;
  perPage: number;
  totalPage: number;
  currentPage: number;
  data: T[];
}

export interface GetAllRequestQuery {
  page?: number;
  orderBy?: string;
  orderDir?: string;
  filterName?: string;
  filterValue?: string;
}
