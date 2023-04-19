import { ApiDataListResponse, IExperienceCategory, IPostCategory } from '@my/types';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { setExperienceCategoryList } from 'redux/reducer/ExperienceCategory/experienceCategoryReducer';
import { AppDispatch } from 'redux/store';

export const getAllExperienceCategories = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.experienceCategoryGetList + '?' + queryString.stringify({ pageSize: 100 }))
    .then((res: ApiDataListResponse<IExperienceCategory>) => dispatch(setExperienceCategoryList(res.data)))
    .catch(() => {});
};
