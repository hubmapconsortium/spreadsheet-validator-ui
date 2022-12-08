import * as jsonpatch from 'fast-json-patch';
import { GREEN, RED } from '../constants/Color';
import { REPAIR_INCOMPLENESS_PATH, REPAIR_INCORRECTNESS_PATH } from '../constants/Router';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../constants/Status';
import { getEffectiveValue } from './data-utils';

const checkCompletenessError = (reportItem) => (
  reportItem.errorType === 'missingRequired'
);

const checkAdherenceError = (reportItem) => (
  reportItem.errorType === 'notStandardTerm'
  || reportItem.errorType === 'notNumberType'
  || reportItem.errorType === 'notStringType'
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

export const generateCompletenessChartData = (spreadsheetData, reportingData) => {
  const dataSize = spreadsheetData.length;
  const errorSize = [...new Set(reportingData
    .filter((item) => checkCompletenessError(item))
    .map((item) => item.row)),
  ].length;
  const validSize = dataSize - errorSize;
  return {
    labels: ['Row has all required value', 'Row missing some required value'],
    innerTextTitle: `${validSize} / ${dataSize}`,
    innerTextSubtitle: 'Completeness',
    datasets: [{
      label: '',
      data: [validSize, errorSize],
      backgroundColor: [GREEN, RED],
    }],
  };
};

export const generateCorrectnessChartData = (spreadsheetData, reportingData) => {
  const dataSize = spreadsheetData.length;
  const errorSize = [...new Set(reportingData
    .filter((item) => checkAdherenceError(item))
    .map((item) => item.row)),
  ].length;
  const validSize = dataSize - errorSize;
  return {
    labels: ['Row has no value type errors', 'Row has some value type error'],
    innerTextTitle: `${validSize} / ${dataSize}`,
    innerTextSubtitle: 'Correctness',
    datasets: [{
      label: '',
      data: [validSize, errorSize],
      backgroundColor: [GREEN, RED],
    }],
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

const printErrorFlag = (errorType) => {
  let errorFlag = 'Unknown error flag';
  if (errorType === 'notStandardTerm') {
    errorFlag = 'Value is not a standard term';
  } else if (errorType === 'notNumberType') {
    errorFlag = 'Value is not a number';
  } else if (errorType === 'notStringType') {
    errorFlag = 'Value is not a string';
  }
  return errorFlag;
};

export const generateInvalidValueTypeAnalysisChartData = (spreadsheetData, errorSummaryData) => ({
  columns: ['Field name', 'Error flag', '# of invalid metadata records'],
  rows: errorSummaryData
    .filter((item) => checkAdherenceError(item))
    .sort((item1, item2) => (item2.rows.length - item1.rows.length))
    .map((item) => [
      item.column,
      printErrorFlag(item.errorType),
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

export const getPagedData = (data, page, rowsPerPage) => (
  (rowsPerPage > 0
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data)
);

export const checkRepairPatchPresent = (row, column, patches) => (
  !!patches[row]
  && !!patches[row][column]
  && typeof patches[row][column].value !== 'undefined'
);

const isRepairCompleted = (rows, column, patches) => (
  rows.every((row) => checkRepairPatchPresent(row, column, patches))
);

const determineRepairIncompletenessStatus = (rows, column, patches) => (
  isRepairCompleted(rows, column, patches)
    ? REPAIR_COMPLETED
    : REPAIR_NOT_COMPLETED
);

export const generateRepairIncompletenessSubMenuData = (errorSummaryData, patches) => {
  const missingRequiredErrorList = errorSummaryData.filter((item) => checkCompletenessError(item));
  const subMenuItems = missingRequiredErrorList.map(
    (errorDetails) => {
      const { column: errorColumnLocation, rows: errorRowLocations, columnLabel } = errorDetails;
      return ({
        errorId: `missing-required-${errorColumnLocation}`,
        name: `missing-required-${errorColumnLocation}`,
        title: `Missing ${columnLabel}`,
        status: determineRepairIncompletenessStatus(
          errorRowLocations,
          errorColumnLocation,
          patches,
        ),
        navigateTo: `${REPAIR_INCOMPLENESS_PATH}/${errorColumnLocation}`,
      });
    },
  );
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
};

const determineRepairIncorrectnessStatus = (errorList, patches) => {
  for (let i = 0; i < errorList.length; i += 1) {
    const errorDetails = errorList[i];
    const { column: errorColumnLocation, rows: errorRowLocations } = errorDetails;
    if (!isRepairCompleted(errorRowLocations, errorColumnLocation, patches)) {
      return REPAIR_NOT_COMPLETED;
    }
  }
  return REPAIR_COMPLETED;
};

const getNotStandardTermSubMenuItemData = (errorSummaryData, patches) => {
  const notStandardTermErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notStandardTerm',
  );
  if (notStandardTermErrorList.length > 0) {
    return {
      errorId: 'not-standard-term-error',
      name: 'not-standard-term-error',
      title: 'Value is not a standard term',
      status: determineRepairIncorrectnessStatus(notStandardTermErrorList, patches),
      navigateTo: `${REPAIR_INCORRECTNESS_PATH}/notStandardTerm`,
    };
  }
  return null;
};

const getNotNumberTypeSubMenuItemData = (errorSummaryData, patches) => {
  const notNumberTypeErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notNumberType',
  );
  if (notNumberTypeErrorList.length > 0) {
    return {
      errorId: 'not-number-type-error',
      name: 'not-number-type-error',
      title: 'Value is not a number',
      status: determineRepairIncorrectnessStatus(notNumberTypeErrorList, patches),
      navigateTo: `${REPAIR_INCORRECTNESS_PATH}/notNumberType`,
    };
  }
  return null;
};

const getNotStringTypeSubMenuItemData = (errorSummaryData, patches) => {
  const notStringTypeErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notStringType',
  );
  if (notStringTypeErrorList.length > 0) {
    return {
      errorId: 'not-string-type-error',
      name: 'not-string-type-error',
      title: 'Value is not a string',
      status: determineRepairIncorrectnessStatus(notStringTypeErrorList, patches),
      navigateTo: `${REPAIR_INCORRECTNESS_PATH}/notStringType`,
    };
  }
  return null;
};

export const generateRepairIncorrectnessSubMenuData = (errorSummaryData, patches) => ({
  title: 'Types of Error',
  items: [
    getNotStandardTermSubMenuItemData(errorSummaryData, patches),
    getNotNumberTypeSubMenuItemData(errorSummaryData, patches),
    getNotStringTypeSubMenuItemData(errorSummaryData, patches),
  ].filter(
    (item) => item !== null,
  ),
});

export const generateRepairIncompletenessButtonData = (errorSummaryData, patches) => {
  const missingRequiredErrorList = errorSummaryData.filter(
    (item) => checkCompletenessError(item),
  );
  return missingRequiredErrorList.map(
    (errorDetails) => {
      const { column: errorColumnLocation, rows: errorRowLocations, columnLabel } = errorDetails;
      const errorSize = errorRowLocations.length;
      const subTitleText = errorSize === 1
        ? '1 record is incomplete'
        : `${errorSize} records are incomplete`;
      return ({
        errorId: `missing-required-${errorColumnLocation}`,
        name: `missing-required-${errorColumnLocation}`,
        title: columnLabel,
        subtitle: subTitleText,
        status: determineRepairIncompletenessStatus(
          errorRowLocations,
          errorColumnLocation,
          patches,
        ),
        navigateTo: errorColumnLocation,
      });
    },
  );
};

const getErrorSize = (errorList) => (
  errorList.reduce(
    (accumulator, errorDetails) => accumulator + errorDetails.rows.length,
    0,
  )
);

const getNotStandardTermButtonItemData = (errorSummaryData, patches) => {
  const notStandardTermErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notStandardTerm',
  );
  const errorSize = getErrorSize(notStandardTermErrorList);
  const subTitleText = errorSize === 1
    ? '1 value is incorrect'
    : `${errorSize} values are incorrect`;
  if (notStandardTermErrorList.length > 0) {
    return {
      errorId: 'not-standard-term-error',
      name: 'not-standard-term-error',
      title: 'Value is not a standard term',
      subtitle: subTitleText,
      status: determineRepairIncorrectnessStatus(notStandardTermErrorList, patches),
      navigateTo: 'notStandardTerm',
    };
  }
  return null;
};

const getNotNumberTypeButtonItemData = (errorSummaryData, patches) => {
  const notNumberTypeErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notNumberType',
  );
  const errorSize = getErrorSize(notNumberTypeErrorList);
  const subTitleText = errorSize === 1
    ? '1 value is incorrect'
    : `${errorSize} values are incorrect`;
  if (notNumberTypeErrorList.length > 0) {
    return {
      errorId: 'not-number-type-error',
      name: 'not-number-type-error',
      title: 'Value is not a number',
      subtitle: subTitleText,
      status: determineRepairIncorrectnessStatus(notNumberTypeErrorList, patches),
      navigateTo: 'notNumberType',
    };
  }
  return null;
};

const getNotStringTypeButtonItemData = (errorSummaryData, patches) => {
  const notStringTypeErrorList = errorSummaryData.filter(
    (item) => item.errorType === 'notStringType',
  );
  const errorSize = getErrorSize(notStringTypeErrorList);
  const subTitleText = errorSize === 1
    ? '1 value is incorrect'
    : `${errorSize} values are incorrect`;
  if (notStringTypeErrorList.length > 0) {
    return {
      errorId: 'not-string-type-error',
      name: 'not-string-type-error',
      title: 'Value is not a string',
      subtitle: subTitleText,
      status: determineRepairIncorrectnessStatus(notStringTypeErrorList, patches),
      navigateTo: 'notStringType',
    };
  }
  return null;
};

export const generateRepairIncorrectnessButtonData = (errorSummaryData, patches) => [
  getNotStandardTermButtonItemData(errorSummaryData, patches),
  getNotNumberTypeButtonItemData(errorSummaryData, patches),
  getNotStringTypeButtonItemData(errorSummaryData, patches),
].filter(
  (item) => item !== null,
);

export const determineOverallRepairStatus = (reporting, patches) => {
  for (let i = 0; i < reporting.length; i += 1) {
    const reportItem = reporting[i];
    const { row, column } = reportItem;
    if (!checkRepairPatchPresent(row, column, patches)) {
      return REPAIR_NOT_COMPLETED;
    }
  }
  return REPAIR_COMPLETED;
};

export const generateErrorSummaryData = (reporting, schema) => (
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
            columnLabel: schema.columns[column].label,
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

const getRepairedRecord = (record, data, patches) => {
  const temp = { ...record };
  Object.keys(record).forEach((column) => {
    // eslint-disable-next-line dot-notation
    const row = record['_id'];
    temp[column] = getEffectiveValue(row, column, data, patches);
  });
  return temp;
};

export const generateRepairedTableData = (rows, data, patches) => (
  rows.map(
    (row) => data[row],
  ).map(
    (record) => getRepairedRecord(record, data, patches),
  )
);

export const generateRepairIncorrectnessTableData = (reporting, data, patches) => {
  const incorrectnessReporting = reporting.filter((item) => checkAdherenceError(item));
  return Object.values(
    incorrectnessReporting.reduce(
      (accumulator, reportItem) => {
        const { row, column, value, errorType, suggestion } = reportItem;
        const key = `${column}-${value}-${errorType}`;
        const matchingGroup = (
          // eslint-disable-next-line no-multi-assign
          accumulator[key] = accumulator[key] || {
            id: key,
            column,
            value,
            suggestion,
            errorType,
            rows: [],
            records: [],
          }
        );
        matchingGroup.rows.push(row);
        matchingGroup.records.push(getRepairedRecord(data[row], data, patches));
        return accumulator;
      },
      {},
    ),
  );
};

export const generateNewSpreadsheet = (data, patches) => {
  const patchArray = patches.map((patch) => (Object.values(patch))).flat();
  const patchedData = jsonpatch.applyPatch(data, patchArray).newDocument;
  return `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(patchedData, null, 2),
  )}`;
};
