export const unCamelCase = (str) => str
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
  .toLowerCase();

export const nullOnEmpty = (value) => {
  if (typeof value === 'string') {
    const newValue = value.trim();
    if (newValue === '') {
      return null;
    }
  }
  return value;
};
