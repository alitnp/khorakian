import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { setSignalResultTypesList } from 'redux/reducer/signalResultTypes/signalResultTypesReducer';
import { signalResultTypes } from 'global/Models/genericRoutesModels/SignalResultTypesModel';

export const getAllSignalResultTypes = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.signalResultTypesGetList, { recordsPerPage: 50 }).then((res: backendReponse<signalResultTypes[]>) => {
    if (res.isSuccess) dispatch(setSignalResultTypesList(res.data));
  });
};
