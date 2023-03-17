import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { timeFrames } from 'global/Models/genericRoutesModels/TimeFramesModel';
import { Dispatch } from 'redux';
import { setTimeFrameList } from 'redux/reducer/TimeFrames/timeFramesReducer';

export const getAllTimeFrames = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.timeFramesGetList, { recordsPerPage: 50 }).then((res: backendReponse<timeFrames[]>) => {
    if (res.isSuccess) dispatch(setTimeFrameList(res.data));
  });
};
