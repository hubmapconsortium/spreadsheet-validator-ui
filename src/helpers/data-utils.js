import { ERROR_FOUND } from '../constants/Status';

export function filterRowsWithEmptyColumn(column, data) {
  return data.filter((row) => (!row[column]));
}

export function buildRepairIncompletenessSubMenu(errorReport) {
  const { missingRequired } = errorReport;
  const subMenuItems = Object.keys(missingRequired).map((column) => (
    {
      title: `Missing ${column}`,
      status: ERROR_FOUND,
      navigateTo: `repair-incompleteness/${column}`,
    }
  ));
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
}

export function buildRepairIncompletenessBadges(errorReport) {
  const { missingRequired } = errorReport;
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
