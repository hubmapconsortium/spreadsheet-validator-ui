export const getDataValue = (row, column, data) => data[row][column];

// eslint-disable-next-line dot-notation
export const getRows = (data) => data.map((row) => row['_id']);

export const getColumnSchema = (column, schema) => schema.columns[column];

export const getColumnName = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.name;
};

export const getColumnLabel = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.label;
};

export const getColumnType = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.type;
};

export const getColumnDescription = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.description;
};

export const isColumnRequired = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.required;
};

export const getPermissibleValues = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.permissibleValues?.map((v) => v.label);
};

export const getMissingRequiredReporting = (reporting) => (
  reporting.filter((reportItem) => reportItem.errorType === 'missingRequired')
);

export const getIncompletenessReporting = (reporting) => (
  getMissingRequiredReporting(reporting)
);

export const getNotStandardTermReporting = (reporting) => (
  reporting.filter((reportItem) => reportItem.errorType === 'notStandardTerm')
);

export const getNotNumberTypeReporting = (reporting) => (
  reporting.filter((reportItem) => reportItem.errorType === 'notNumberType')
);

export const getNotStringTypeReporting = (reporting) => (
  reporting.filter((reportItem) => reportItem.errorType === 'notStringType')
);

export const getIncorrectnessReporting = (reporting) => (
  reporting.filter(
    (reportItem) => reportItem.errorType === 'notStandardTerm'
      || reportItem.errorType === 'notNumberType'
      || reportItem.errorType === 'notStringType',
  )
);

export const getPatchGroup = (row, patches) => {
  const mutablePatches = patches;
  const patchGroup = patches[row];
  if (typeof patchGroup === 'undefined') {
    mutablePatches[row] = {};
  }
  return patches[row];
};

export const getPatch = (row, column, patches) => getPatchGroup(row, patches)[column];

export const getPatchValue = (row, column, patches) => getPatch(row, column, patches)?.value;

export const getEffectiveValue = (row, column, data, patches) => {
  // eslint-disable-next-line dot-notation
  let value = getPatchValue(row, column, patches);
  if (!value) {
    value = getDataValue(row, column, data);
  }
  return value;
};
