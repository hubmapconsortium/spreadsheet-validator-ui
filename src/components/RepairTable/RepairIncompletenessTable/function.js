import { getPatchValue } from '../../../helpers/data-utils';

export const initUserInput = (rows, column, patches) => rows
  .reduce((result, row) => (
    {
      ...result,
      [row]: getPatchValue(row, column, patches),
    }
  ), {});

export const getFilteredData = (data, filters) => data.filter(
  (row) => filters
    .filter((filter) => filter.enabled)
    .every((filter) => {
      const cellValue = row[filter.column] || '';
      const cellValueString = cellValue.toString();
      return cellValueString.toLowerCase().includes(filter.value.toLowerCase());
    }),
);
