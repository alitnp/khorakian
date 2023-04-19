import { ApiDataListResponse, IUserExperienceCategory } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setUserExperienceCategoryList } from 'redux/reducer/UserExperienceCategory/UserExperienceCategoryReducer';
import { AppDispatch } from 'redux/store';

export const getAllUserExperienceCategories = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.userExperienceCategoryGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IUserExperienceCategory>) => dispatch(setUserExperienceCategoryList(res.data)))
    .catch(() => {});
};
