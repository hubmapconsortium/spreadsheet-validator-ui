import { getPatchValue } from '../../helpers/data-utils';
import { checkRepairPatchPresent } from '../../helpers/app-utils';

// eslint-disable-next-line import/prefer-default-export
export const initUserInput = (tableData, patches) => tableData
  .reduce((accumulator, rowData) => ({
    ...accumulator,
    [rowData.id]: {
      column: rowData.column,
      value: getPatchValue(
        rowData.rows[0], // select first item
        rowData.column,
        patches,
      ) || rowData.suggestion,
      rows: rowData.rows,
      approved: checkRepairPatchPresent(rowData.rows[0], rowData.column, patches),
    },
  }), {});
