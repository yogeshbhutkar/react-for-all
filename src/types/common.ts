export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PaginationParams = {
  offset: number;
  limit: number;
};

export type resultKind =
  | "TEXT"
  | "DROPDOWN"
  | "RADIO"
  | "GENERIC"
  | "tel"
  | "email"
  | "date"
  | "number";

export type results = {
  id: number;
  label: string;
  kind: resultKind;
  options: option[];
  value: string;
  meta: { type: string };
};

export type option = {
  id: number;
  option: string;
};
