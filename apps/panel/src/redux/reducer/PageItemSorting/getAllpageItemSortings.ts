import { ApiDataListResponse, IPageItemSorting } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setPageItemSortingList } from 'redux/reducer/PageItemSorting/pageItemSortingReducer';
import { AppDispatch } from 'redux/store';

export const getAllPageItemSortings = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.pageItemSortingGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IPageItemSorting>) => dispatch(setPageItemSortingList(res.data)))
    .catch(() => {});
};
