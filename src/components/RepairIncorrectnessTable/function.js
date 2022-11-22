import { getPatchValue } from '../../helpers/data-utils';
import { checkPatchNotUndefined } from '../../helpers/app-utils';

// eslint-disable-next-line import/prefer-default-export
export const initUserInput = (tableData, patches) => tableData
  .reduce((result, summaryData) => ({
    ...result,
    [summaryData.key]: {
      column: summaryData.column,
      value: getPatchValue(
        summaryData.rows[0], // select first item
        summaryData.column,
        patches,
      ) || summaryData.suggestion,
      rows: summaryData.rows,
      approved: checkPatchNotUndefined(summaryData.rows[0], summaryData.column, patches),
    },
  }), {});
