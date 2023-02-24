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

export const getTotalErrorCountTitle = (report) => (
  `${report.length} issues were found`
);

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
