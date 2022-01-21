import {
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseSortByColumnOptions,
  UseSortByColumnProps,
} from "react-table";

declare module "react-table" {
  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D> {}
}
