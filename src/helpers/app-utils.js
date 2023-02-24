import * as jsonpatch from 'fast-json-patch';
import { GREEN, RED } from '../constants/Color';
import { add } from './array-utils';
import { getEffectiveValue } from './data-utils';
import { getErrorFlagTitle } from './title-utils';

export const getPagedData = (data, page, rowsPerPage) => (
  (rowsPerPage > 0
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data)
);

const checkMissingRequiredError = (reportItem) => (
  reportItem.errorType === 'missingRequired'
);

const checkCompletenessError = (reportItem) => (
  checkMissingRequiredError(reportItem)
);

const checkNotStandardTermError = (reportItem) => (
  reportItem.errorType === 'notStandardTerm'
);

const checkNotNumberTypeError = (reportItem) => (
  reportItem.errorType === 'notNumberType'
);

const checkNotStringTypeError = (reportItem) => (
  reportItem.errorType === 'notStringType'
);

const checkAdherenceError = (reportItem) => (
  checkNotStandardTermError(reportItem)
  || checkNotNumberTypeError(reportItem)
  || checkNotStringTypeError(reportItem)
);

export const generateEvaluationSummaryData = (spreadsheetData, reportingData) => {
  const dataSize = spreadsheetData.length;
  const errorSize = [...new Set(reportingData.map((item) => item.row))].length;
  const validSize = dataSize - errorSize;
  return {
    labels: ['Invalid metadata', 'Valid metadata'],
    innerTextTitle: `${errorSize} / ${dataSize}`,
    innerTextSubtitle: 'Overview',
    datasets: [{
      label: '',
      data: [errorSize, validSize],
      backgroundColor: [RED, GREEN],
    }],
    hasCompletenessErrors: reportingData.some((item) => checkCompletenessError(item)),
    hasAdherenceErrors: reportingData.some((item) => checkAdherenceError(item)),
  };
};

export const generateMissingValueAnalysisChartData = (spreadsheetData, errorSummaryData) => ({
  columns: ['Field name', '# of invalid metadata records'],
  rows: errorSummaryData
    .filter((item) => checkCompletenessError(item))
    .sort((item1, item2) => (item2.rows.length - item1.rows.length))
    .map((item) => [
      item.column,
      [
        { value: item.rows.length, color: RED },
        { value: spreadsheetData.length - item.rows.length, color: GREEN },
      ],
    ]),
});

export const generateInvalidValueTypeAnalysisChartData = (spreadsheetData, errorSummaryData) => ({
  columns: ['Field name', 'Error flag', '# of invalid metadata records'],
  rows: errorSummaryData
    .filter((item) => checkAdherenceError(item))
    .sort((item1, item2) => (item2.rows.length - item1.rows.length))
    .map((item) => [
      item.column,
      getErrorFlagTitle(item.errorType),
      [
        { value: item.rows.length, color: RED },
        { value: spreadsheetData.length - item.rows.length, color: GREEN },
      ],
    ]),
});

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

export const checkRepairPatchPresent = (row, column, patches) => (
  !!patches[row]
  && !!patches[row][column]
  && typeof patches[row][column].value !== 'undefined'
);

export const isRepairCompleted = (rows, column, patches) => (
  rows.every((row) => checkRepairPatchPresent(row, column, patches))
);

const countRemainingErrors = (errorDetails, patches) => {
  const { rows, column } = errorDetails;
  return rows.map((row) => checkRepairPatchPresent(row, column, patches))
    .map((bool) => (bool ? 0 : 1))
    .reduce(add, 0);
};

export const generateCompletenessErrorStatusList = (errorSummary, patches) => {
  const filteredSummary = errorSummary.filter(
    (item) => checkCompletenessError(item),
  );
  return filteredSummary.map(
    (summaryItem) => {
      const { column } = summaryItem;
      return ({
        errorId: `missing-required-${column}`,
        errorType: 'missingRequired',
        errorCount: countRemainingErrors(summaryItem, patches),
        errorLocation: column,
      });
    },
  );
};

const countRemainingErrorsFromErrorSummary = (errorSummary, patches) => (
  errorSummary.reduce(
    (accumulator, summaryItem) => accumulator + countRemainingErrors(summaryItem, patches),
    0,
  )
);

const getNotStandardTermButtonItemData = (errorSummary, patches) => {
  const filteredSummary = errorSummary.filter(
    (reportItem) => checkNotStandardTermError(reportItem),
  );
  if (filteredSummary.length > 0) {
    return {
      errorId: 'not-standard-term-error',
      errorType: 'notStandardTerm',
      errorCount: countRemainingErrorsFromErrorSummary(filteredSummary, patches),
      errorLocation: null,
    };
  }
  return null;
};

const getNotNumberTypeButtonItemData = (errorSummary, patches) => {
  const filteredSummary = errorSummary.filter(
    (reportItem) => checkNotNumberTypeError(reportItem),
  );
  if (filteredSummary.length > 0) {
    return {
      errorId: 'not-number-type-error',
      errorType: 'notNumberType',
      errorCount: countRemainingErrorsFromErrorSummary(filteredSummary, patches),
      errorLocation: null,
    };
  }
  return null;
};

const getNotStringTypeButtonItemData = (errorSummary, patches) => {
  const filteredSummary = errorSummary.filter(
    (reportItem) => checkNotStringTypeError(reportItem),
  );
  if (filteredSummary.length > 0) {
    return {
      errorId: 'not-string-type-error',
      errorType: 'notStringType',
      errorCount: countRemainingErrorsFromErrorSummary(filteredSummary, patches),
      errorLocation: null,
    };
  }
  return null;
};

export const generateAdherenceErrorStatusList = (errorSummary, patches) => [
  getNotStandardTermButtonItemData(errorSummary, patches),
  getNotNumberTypeButtonItemData(errorSummary, patches),
  getNotStringTypeButtonItemData(errorSummary, patches),
].filter(
  (item) => item !== null,
);

export const generateErrorSummaryReport = (reporting) => (
  Object.values(
    reporting.reduce(
      (accumulator, reportItem) => {
        const { row, column, errorType } = reportItem;
        const key = `${column}-${errorType}`;
        const matchingGroup = (
          // eslint-disable-next-line no-multi-assign
          accumulator[key] = accumulator[key] || {
            column,
            rows: [],
            errorType,
          }
        );
        matchingGroup.rows.push(row);
        return accumulator;
      },
      {}, // initial accumulator value
    ),
  )
);

const getRecord = (row, data, patches) => {
  const oldRecord = data[row];
  const newRecord = { ...oldRecord };
  Object.keys(newRecord).forEach((column) => {
    newRecord[column] = getEffectiveValue(row, column, data, patches);
  });
  return newRecord;
};

export const generateCompletenessErrorTableData = (errorReport, data, patches) => (
  errorReport.map(
    (reportItem) => {
      const { row } = reportItem;
      return getRecord(row, data, patches);
    },
  )
);

export const generateAdherenceErrorTableData = (errorReport, data, patches) => {
  const result = errorReport.reduce(
    (accumulator, reportItem) => {
      const { row, column, value, errorType } = reportItem;
      const key = `${column}-${value}-${errorType}`;
      const matchingGroup = (
        // eslint-disable-next-line no-multi-assign
        accumulator[key] = accumulator[key] || {
          ...reportItem,
          id: key,
          rows: [],
          records: [],
        }
      );
      matchingGroup.rows.push(row);
      matchingGroup.records.push(getRecord(row, data, patches));
      return accumulator;
    },
    {},
  );
  return Object.values(result);
};

export const generateNewSpreadsheet = (data, patches) => {
  const patchArray = patches.map((patch) => (Object.values(patch))).flat();
  const patchedData = jsonpatch.applyPatch(data, patchArray).newDocument;
  return `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(patchedData, null, 2),
  )}`;
};
