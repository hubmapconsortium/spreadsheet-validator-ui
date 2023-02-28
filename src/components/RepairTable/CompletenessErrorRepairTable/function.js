import { getPatchValue } from '../../../helpers/data-utils';

export const initUserInput = (tableData, column, patches) => (
  tableData.reduce((result, record) => {
    const { rowNumber } = record;
    return (
      {
        ...result,
        [rowNumber]: getPatchValue(rowNumber, column, patches),
      });
  }, {})
);

export const getFilteredData = (data, filters) => data.filter(
  (row) => filters
    .filter((filter) => filter.enabled)
    .every((filter) => {
      const cellValue = row[filter.column] || '';
      const cellValueString = cellValue.toString();
      return cellValueString.toLowerCase().includes(filter.value.toLowerCase());
    }),
);
