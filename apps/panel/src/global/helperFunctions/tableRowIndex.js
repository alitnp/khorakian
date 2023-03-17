export const tableRowIndex = (index = 0, pageNumber = 1, pageSize = 10) => {
  return index + 1 + (pageNumber - 1) * pageSize;
};
