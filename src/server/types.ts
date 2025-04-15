export type PaginatedResponse<T> = {
  items: T[];
  paging: {
    limit: number;
    offset: number;
    total: number;
  };
};

export interface IImage {
  id: string;
  url: string;
  name: string;
  created: string;
  tags: string[];
}
