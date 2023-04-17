import { ApiDataListResponse, IIdeaCategory } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setIdeaCategoryList } from 'redux/reducer/IdeaCategory/ideaCategoryReducer';
import { AppDispatch } from 'redux/store';

export const getAllIdeaCategories = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.ideaCategoryGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IIdeaCategory>) => dispatch(setIdeaCategoryList(res.data)))
    .catch(() => {});
};
