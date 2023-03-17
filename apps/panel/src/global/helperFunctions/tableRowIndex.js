export const tableRowIndex = (index = 0, pageNumber = 1, recordPerPage = 10) => {
  return index + 1 + (pageNumber - 1) * recordPerPage;
};
