// constants
export const defaultPageSize = 10;

// functions
export function defaultFilter(filter, row) {
  if (row[filter.id] == null) return false;
  return row[filter.id].toString().toLowerCase()
    .includes(filter.value.toString().toLowerCase());
}

export function defaultNumberFilter(filter, row) {
  if (row[filter.id] == null) return false;
  return row[filter.id] == parseInt(filter.value);
}
