import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';

import { effectivePointTypes } from 'global/Models/genericRoutesModels/EffectivePointTypesModel';
import { setEffectivePointTypesList } from 'redux/reducer/effectivePointTypes/effectivePointTypesReducer';

export const getAllEffectivePointTypes = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.effectivePointTypesGetList, { recordsPerPage: 50 }).then((res: backendReponse<effectivePointTypes[]>) => {
    if (res.isSuccess) dispatch(setEffectivePointTypesList(res.data));
  });
};
