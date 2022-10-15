export default function filterRowsWithEmptyColumn(column, data) {
  return data.filter((row) => (!row[column]));
}
