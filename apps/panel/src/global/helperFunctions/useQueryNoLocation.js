import { useState } from 'react';

const useQueryNoLocation = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [query, setQuery] = useState({});

  const resetQuery = () => {
    setRecordsPerPage(10);
    setPageNumber(1);
    setQuery({});
  };

  const handlePagination = (pageNumber, recordsPerPage) => {
    setRecordsPerPage(recordsPerPage);
    setPageNumber(pageNumber);
    setQuery({ ...query, pageNumber: pageNumber || 1, recordsPerPage: recordsPerPage || 10 });
  };

  return {
    query,
    setQuery,
    resetQuery,
    pageNumber,
    recordsPerPage,
    handlePagination,
  };
};

export default useQueryNoLocation;
