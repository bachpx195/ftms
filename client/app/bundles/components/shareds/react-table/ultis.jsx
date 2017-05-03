// constants
export const defaultPageSize = 10;

// functions
export function defaultFilter(filter, row) {
  if (row[filter.id]) {
    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
  }
  return false;
}
