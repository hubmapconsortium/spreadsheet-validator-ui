import { ERROR_FOUND } from '../constants/Status';
import { REPAIR_INCOMPLENESS_PATH } from '../constants/Router';

export function buildRepairIncompletenessSubMenu(reporting) {
  const { missingRequired } = reporting;
  const subMenuItems = Object.keys(missingRequired).map((column) => (
    {
      title: `Missing ${column}`,
      status: ERROR_FOUND,
      navigateTo: `${REPAIR_INCOMPLENESS_PATH}/${column}`,
    }
  ));
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
}

export function buildRepairIncompletenessBadges(reporting) {
  const { missingRequired } = reporting;
  const badgeItems = Object.keys(missingRequired).map((column) => (
    {
      title: `${column}`,
      caption: `Value missing in ${missingRequired[column].length} rows.`,
      status: ERROR_FOUND,
      navigateTo: `${column}`,
    }
  ));
  return badgeItems;
}

export function getTableValue(rowIndex, columnName, table) {
  return table[rowIndex][columnName];
}

export function getLabelForColumn(column, schema) {
  return schema.columns[column].label;
}

export function getPermissibleValuesForColumn(column, schema) {
  return schema.columns[column].permissibleValues;
}

export function getDataTypeForColumn(column, schema) {
  return schema.columns[column].type;
}

export function getMissingRequiredForColumn(column, reporting) {
  return reporting.missingRequired[column];
}

export function getPatchGroup(rowIndex, patches) {
  const mutablePatches = patches;
  const patchGroup = patches[rowIndex];
  if (typeof patchGroup === 'undefined') {
    mutablePatches[rowIndex] = {};
  }
  return patchGroup;
}

export function getPatch(rowIndex, columnName, patches) {
  return getPatchGroup(rowIndex, patches)[columnName];
}

export function getPatchValue(rowIndex, columnName, patches) {
  return getPatch(rowIndex, columnName, patches)?.value;
}
