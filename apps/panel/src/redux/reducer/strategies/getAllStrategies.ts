import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { strategies } from 'global/Models/genericRoutesModels/StrategiesModel';
import { setStrategiesList } from 'redux/reducer/strategies/strategiesReducer';

export const getAllStrategies = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.strategiesGetList, { recordsPerPage: 50 }).then((res: backendReponse<strategies[]>) => {
    if (res.isSuccess) dispatch(setStrategiesList(res.data));
  });
};
