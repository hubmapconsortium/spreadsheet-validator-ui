import { REPAIR_INCOMPLENESS_PATH, REPAIR_INCONSISTENCY_PATH } from '../constants/Router';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../constants/Status';
import { getTotalNotNumberType, getTotalNotStandardTerm, getTotalNotStringType } from './data-utils';

export const getPagedData = (data, page, rowsPerPage) => (
  (rowsPerPage > 0
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data)
);

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
      caption: `${rows.length} records are incomplete`,
      status: determineRepairIncompletenessStatus(rows, column, patches),
      navigateTo: column,
    });
  });
  return badgeItems;
};

export const buildRepairInconsistencyBadges = (reporting, patches) => {
  const { notStandardTerm, notNumberType, notStringType } = reporting;
  const badgeItems = [];
  if (notStandardTerm) {
    const totalErrors = getTotalNotStandardTerm(reporting);
    badgeItems.push({
      id: 'not-standard-term-error',
      title: 'Value is not a standard term',
      caption: `${totalErrors} values are inconsistent`,
      status: determineRepairInconsistencyStatus(notStandardTerm, patches),
      navigateTo: 'notStandardTerm',
    });
  }
  if (notNumberType) {
    const totalErrors = getTotalNotNumberType(reporting);
    badgeItems.push({
      id: 'not-number-type-error',
      title: 'Value is not a number type',
      caption: `${totalErrors} values are inconsistent`,
      status: determineRepairInconsistencyStatus(notNumberType, patches),
      navigateTo: 'notNumberType',
    });
  }
  if (notStringType) {
    const totalErrors = getTotalNotStringType(reporting);
    badgeItems.push({
      id: 'not-string-type-error',
      title: 'Value is not a string type',
      caption: `${totalErrors} values are inconsistent`,
      status: determineRepairInconsistencyStatus(notStringType, patches),
      navigateTo: 'notStringType',
    });
  }
  return badgeItems;
};

export const buildInconsistencySummaryData = (inconsistencyReporting) => {
  const targetColumns = Object.keys(inconsistencyReporting);
  return targetColumns.map(
    (column) => {
      const evaluationByColumn = inconsistencyReporting[column];
      return evaluationByColumn.reduce((groups, item) => {
        const { value } = item;
        const { suggestion } = item;
        const key = `${column}-${value}`;
        const group = (groups[key] || {
          column,
          value,
          suggestion,
          rows: [],
        });
        group.rows.push(item.row);
        // eslint-disable-next-line no-param-reassign
        groups[key] = group;
        return groups;
      }, {});
    },
  ).map((item) => Object.values(item)).flat();
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
