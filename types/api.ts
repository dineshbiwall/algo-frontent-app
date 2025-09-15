export interface ApiResponse<T = undefined> {
  status: number;
  message: string;
  data: T;
  statusCode: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponsePagination<T> {
  nextCursor: string | null | undefined;
  previousCursor: string | null | undefined;
  items: T;
}

export interface ApiPaginationWithTotal<T> {
  nextCursor: string | null | undefined;
  previousCursor: string | null | undefined;
  items: T;
  total: number;
  unreadCount?: number;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  errors?: Record<string, any>;
}
