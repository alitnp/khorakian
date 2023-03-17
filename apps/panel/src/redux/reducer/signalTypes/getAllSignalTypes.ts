import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { signalTypes } from 'global/Models/genericRoutesModels/SignalTypesModel';
import { setSignalTypesList } from 'redux/reducer/signalTypes/signalTypesReducer';

export const getAllSignalTypes = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.signalTypesGetList, { recordsPerPage: 50 }).then((res: backendReponse<signalTypes[]>) => {
    if (res.isSuccess) dispatch(setSignalTypesList(res.data));
  });
};
