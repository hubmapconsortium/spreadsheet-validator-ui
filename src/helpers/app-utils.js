import { REPAIR_INCOMPLENESS_PATH, REPAIR_INCONSISTENCY_PATH } from '../constants/Router';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../constants/Status';

const checkPatchNotUndefined = (row, column, patches) => (
  !!patches[row] && !!patches[row][column] && !!patches[row][column].value
);

const determineRepairIncompletenessStatus = (rows, column, patches) => (
  rows.map(
    (row) => checkPatchNotUndefined(row, column, patches),
  ).reduce(
    (cache, value) => cache && value,
  ) ? REPAIR_COMPLETED : REPAIR_NOT_COMPLETED
);

export const buildRepairIncompletenessSubMenu = (reporting, patches) => {
  const { missingRequired } = reporting;
  const subMenuItems = Object.keys(missingRequired).map((column, index) => {
    const rows = missingRequired[column];
    return ({
      id: `incomplete-error-${index}`,
      title: `Missing ${column}`,
      status: determineRepairIncompletenessStatus(rows, column, patches),
      navigateTo: `${REPAIR_INCOMPLENESS_PATH}/${column}`,
    });
  });
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
};

export const determineRepairInconsistencyStatus = (inconsistencyReporting, patches) => {
  const columns = Object.keys(inconsistencyReporting);
  return columns.map((column) => {
    const reports = inconsistencyReporting[column];
    return reports.map((report) => {
      const { row } = report;
      return checkPatchNotUndefined(row, column, patches);
    });
  }).flat(1).reduce(
    (cache, value) => cache && value,
  ) ? REPAIR_COMPLETED : REPAIR_NOT_COMPLETED;
};

export const buildRepairInconsistencySubMenu = (reporting, patches) => {
  const { notStandardTerm, notNumberType, notStringType } = reporting;
  const subMenuItems = [];
  if (notStandardTerm) {
    subMenuItems.push({
      id: 'not-standard-term-error',
      title: 'Value not standard term',
      status: determineRepairInconsistencyStatus(notStandardTerm, patches),
      navigateTo: `${REPAIR_INCONSISTENCY_PATH}/notStandardTerm`,
    });
  }
  if (notNumberType) {
    subMenuItems.push({
      id: 'not-number-type-error',
      title: 'Value not number type',
      status: determineRepairInconsistencyStatus(notNumberType, patches),
      navigateTo: `${REPAIR_INCONSISTENCY_PATH}/notNumberType`,
    });
  }
  if (notStringType) {
    subMenuItems.push({
      id: 'not-string-type-error',
      title: 'Value not string type',
      status: determineRepairInconsistencyStatus(notStringType, patches),
      navigateTo: `${REPAIR_INCONSISTENCY_PATH}/notStringType`,
    });
  }
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
};

export const buildRepairIncompletenessBadges = (reporting, patches) => {
  const { missingRequired } = reporting;
  const badgeItems = Object.keys(missingRequired).map((column, index) => {
    const rows = missingRequired[column];
    return ({
      id: `incomplete-error-${index}`,
      title: column,
      caption: `Value missing in ${rows.length} rows.`,
      status: determineRepairIncompletenessStatus(rows, column, patches),
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
