import { REPAIR_INCOMPLENESS_PATH } from '../constants/Router';
import { ERROR_FOUND } from '../constants/Status';
import { getPatchGroup } from './data-utils';

export const buildRepairIncompletenessSubMenu = (reporting) => {
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
};

export const buildRepairIncompletenessBadges = (reporting) => {
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
};

export const handlePatchCrud = (patches, action) => {
  const { command, patchOp, value, target } = action;
  const { row, column } = target;
  const patchGroup = getPatchGroup(row, patches);
  if (command === 'CREATE_PATCH') {
    if (patchOp === 'ADD') {
      patchGroup[column] = {
        op: 'add',
        path: `/${row}/${column}`,
        value,
      };
    } else if (patchOp === 'REPLACE') {
      patchGroup[column] = {
        op: 'replace',
        path: `/${row}/${column}`,
        value,
      };
    }
  }
  return patches;
};
