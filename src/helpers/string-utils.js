export const unCamelCase = (str) => str
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
  .toLowerCase();

export const nullOnEmpty = (value) => {
  let newValue = value;
  if (typeof value === 'string') {
    newValue = value.trim();
  }
  if (newValue === '') {
    return null;
  }
  return newValue;
};
