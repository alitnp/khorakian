import { ApiDataListResponse, IPageItemStyle } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setPageItemStyleList } from 'redux/reducer/PageItemStyle/pageItemStyleReducer';
import { AppDispatch } from 'redux/store';

export const getAllPageItemStyles = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.pageItemStyleGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IPageItemStyle>) => dispatch(setPageItemStyleList(res.data)))
    .catch(() => {});
};
