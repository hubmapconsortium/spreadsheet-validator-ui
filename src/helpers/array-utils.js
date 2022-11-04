export const moveItemToFront = (item, arr) => arr.sort(
  // eslint-disable-next-line no-nested-ternary
  (x, y) => (x === item ? -1 : (y === item ? 1 : 0)),
);

export const extractItems = (indexes, arr) => indexes.map((index) => arr[index]);

export const generateEmptyObjects = (size) => Array
  .from({ length: size }, () => ({}));
