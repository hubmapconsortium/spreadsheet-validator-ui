import { getPatchGroup } from './data-utils';

export default function handlePatchCrud(state, action) {
  const patches = state;
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
  return state;
}
