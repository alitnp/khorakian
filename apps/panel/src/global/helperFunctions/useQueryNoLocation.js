import { useState } from 'react';

const useQueryNoLocation = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState({});

  const resetQuery = () => {
    setPageSize(10);
    setPageNumber(1);
    setQuery({});
  };

  const handlePagination = (pageNumber, pageSize) => {
    setPageSize(pageSize);
    setPageNumber(pageNumber);
    setQuery({ ...query, pageNumber: pageNumber || 1, pageSize: pageSize || 10 });
  };

  return {
    query,
    setQuery,
    resetQuery,
    pageNumber,
    pageSize,
    handlePagination,
  };
};

export default useQueryNoLocation;
