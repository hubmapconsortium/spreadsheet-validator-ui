export const getOverviewTitle = () => (
  'Overview'
);

export const getValidationResultTitle = () => (
  'Validation Result'
);

export const getCompletenessErrorRepairTitle = () => (
  'Repair Completeness Errors'
);

export const getAdherenceErrorRepairTitle = () => (
  'Repair Adherence Errors'
);

export const getTotalErrorCountTitle = (report, errorType, column = '') => {
  let title = `Unknown error type: ${errorType}`;
  const errorSize = report.length;
  if (errorType === 'missingRequired') {
    title = `${errorSize} ${errorSize === 1 ? 'record is' : 'records are'} missing "${column}" value`;
  } else if (errorType === 'notStandardTerm') {
    title = `${errorSize} ${errorSize === 1 ? 'value is' : 'values are'} are not using the standard term`;
  } else if (errorType === 'notNumberType') {
    title = `${errorSize} ${errorSize === 1 ? 'value is' : 'values are'} not a number`;
  } else if (errorType === 'notStringType') {
    title = `${errorSize} ${errorSize === 1 ? 'value is' : 'values are'} not a string`;
  }
  return title;
};

export const getNavigationSubMenuTitle = (errorType, column = '') => {
  let title = `Unknown error type: ${errorType}`;
  if (errorType === 'missingRequired') {
    title = `Missing "${column}" value`;
  } else if (errorType === 'notStandardTerm') {
    title = 'Value is not a standard term';
  } else if (errorType === 'notNumberType') {
    title = 'Value is not number';
  } else if (errorType === 'notStringType') {
    title = 'Value is not string';
  }
  return title;
};

export const getErrorFlagTitle = (errorType, column = '') => (
  getNavigationSubMenuTitle(errorType, column)
);

export const getActionButtonTitle = (errorType, column = '') => {
  let title = `Unknown error type: ${errorType}`;
  if (errorType === 'missingRequired') {
    title = `Fill out missing "${column}" value`;
  } else if (errorType === 'notStandardTerm') {
    title = 'Replace value with the standard term';
  } else if (errorType === 'notNumberType') {
    title = 'Replace value with a number';
  } else if (errorType === 'notStringType') {
    title = 'Replace value with a string';
  }
  return title;
};
