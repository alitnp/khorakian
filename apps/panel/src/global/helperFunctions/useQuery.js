import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { convertAllPropertyToEnNumber } from 'global/default';
import { decryptId } from 'global/helperFunctions/hashquery';

const useQuery = () => {
  const { push } = useHistory();
  const location = useLocation();

  const query = convertAllPropertyToEnNumber(queryString.parse(location.search), true);

  const setQuery = (newQuery) => push(location.pathname + '?' + queryString.stringify(newQuery));
  const addQuery = (newQuery) => push(location.pathname + '?' + queryString.stringify({ ...query, ...newQuery }));
  const resetQuary = (defaultQuery = {}) => push(location.pathname + '?' + queryString.stringify({ recordsPerPage: query.recordsPerPage || 10, ...defaultQuery }));
  const handlePagination = (pageNumber, recordsPerPage) =>
    push(location.pathname + '?' + queryString.stringify({ ...query, pageNumber: pageNumber || 1, recordsPerPage: recordsPerPage || 10 }));

  const pathnameArray = location.pathname.split('/');
  const pathnameLastPart = pathnameArray.at(-1);
  const decryptedPathnameLastPart = pathnameLastPart ? decryptId(pathnameLastPart) : '';

  return {
    query,
    setQuery,
    addQuery,
    resetQuary,
    pageNumber: query.pageNumber || 1,
    recordsPerPage: query.recordsPerPage || 10,
    handlePagination,
    search: location.search,
    pathname: location.pathname,
    pathnameArray,
    pathnameLastPart,
    decryptedPathnameLastPart,
    push,
  };
};

export default useQuery;
