import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { packages } from 'global/Models/packagesModels';
import { setPackegesList } from 'redux/reducer/packages/packagesReducer';

export const getAllPackages = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.packagesGetList, { recordsPerPage: 50 }).then((res: backendReponse<packages[]>) => {
    if (res.isSuccess) dispatch(setPackegesList(res.data));
  });
};
