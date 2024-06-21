export interface Pagable<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
