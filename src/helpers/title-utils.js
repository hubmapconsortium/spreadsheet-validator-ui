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

export const print = () => (
  'Print'
);
