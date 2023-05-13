import { ApiDataListResponse, IPageItemType } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setPageItemTypeList } from 'redux/reducer/PageItemType/pageItemTypeReducer';
import { AppDispatch } from 'redux/store';

export const getAllPageItemTypes = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.pageItemTypeGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IPageItemType>) => dispatch(setPageItemTypeList(res.data)))
    .catch(() => {});
};
