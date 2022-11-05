export const getDataValue = (row, column, data) => data[row][column];

// eslint-disable-next-line dot-notation
export const getRows = (data) => data.map((row) => row['_id']);

export const getColumnSchema = (column, schema) => schema.columns[column];

export const getColumnLabel = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.label;
};

export function getDataTypeForColumn(column, schema) {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.type;
}

export const getPermissibleValues = (column, schema) => {
  const columnSchema = getColumnSchema(column, schema);
  return columnSchema.permissibleValues;
};

export const getMissingRequiredRows = (column, reporting) => reporting.missingRequired[column];

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
