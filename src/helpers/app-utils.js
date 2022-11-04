import { REPAIR_INCOMPLENESS_PATH } from '../constants/Router';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../constants/Status';

const checkPatchNotUndefined = (row, column, patches) => (
  patches[row] && patches[row][column] && patches[row][column].value && true
);

const determineRepairStatus = (rows, column, patches) => (
  rows.map(
    (row) => checkPatchNotUndefined(row, column, patches),
  ).reduce(
    (cache, value) => cache && value,
  ) ? REPAIR_COMPLETED : REPAIR_NOT_COMPLETED
);

export const buildRepairIncompletenessSubMenu = (reporting, patches) => {
  const { missingRequired } = reporting;
  const subMenuItems = Object.keys(missingRequired).map((column) => {
    const rows = missingRequired[column];
    return ({
      title: `Missing ${column}`,
      status: determineRepairStatus(rows, column, patches),
      navigateTo: `${REPAIR_INCOMPLENESS_PATH}/${column}`,
    });
  });
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
};

export const buildRepairIncompletenessBadges = (reporting, patches) => {
  const { missingRequired } = reporting;
  const badgeItems = Object.keys(missingRequired).map((column) => {
    const rows = missingRequired[column];
    return ({
      title: column,
      caption: `Value missing in ${rows.length} rows.`,
      status: determineRepairStatus(rows, column, patches),
      navigateTo: column,
    });
  });
  return badgeItems;
};

export const createAddOperationPatch = (row, column, value) => ({
  op: 'add',
  path: `/${row}/${column}`,
  value,
});

export const createReplaceOperationPatch = (row, column, value) => ({
  op: 'replace',
  path: `/${row}/${column}`,
  value,
});
