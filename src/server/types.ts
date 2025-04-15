export type PaginatedResponse<T> = {
  items: T[];
  paging: {
    limit: number;
    offset: number;
    total: number;
  };
};

export type Image = {
  id: string;
  url: string;
  name: string;
  created: string;
  tags: string[];
};
