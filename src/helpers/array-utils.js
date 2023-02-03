export const moveItemToFront = (item, arr) => arr.sort(
  // eslint-disable-next-line no-nested-ternary
  (x, y) => (x === item ? -1 : (y === item ? 1 : 0)),
);

export const generateFalses = (size) => Array
  .from({ length: size }, () => (false));

export const generateEmptyObjects = (size) => Array
  .from({ length: size }, () => ({}));

export const add = (a, b) => a + b;
