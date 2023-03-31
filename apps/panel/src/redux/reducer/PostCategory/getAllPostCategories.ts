import { ApiDataListResponse, IPostCategory } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setPostCategoryList } from 'redux/reducer/PostCategory/postCategoryReducer';
import { AppDispatch } from 'redux/store';

export const getAllPostCategories = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.postCategoryGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IPostCategory>) => dispatch(setPostCategoryList(res.data)))
    .catch(() => {});
};
