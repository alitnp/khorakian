import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { signalStatuses } from 'global/Models/genericRoutesModels/SignalStatusesModel';
import { setSignalStatusesList } from 'redux/reducer/signalStatuses/signalStatusesReducer';

export const getAllSignalStatuses = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.signalStatusesGetList, { recordsPerPage: 50 }).then((res: backendReponse<signalStatuses[]>) => {
    if (res.isSuccess) dispatch(setSignalStatusesList(res.data));
  });
};
