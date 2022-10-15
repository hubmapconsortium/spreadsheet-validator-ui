export default function moveToFront(item, arr) {
  // eslint-disable-next-line no-nested-ternary
  return arr.sort((x, y) => (x === item ? -1 : (y === item ? 1 : 0)));
}
