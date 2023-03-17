import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { tradingTypes } from 'global/Models/genericRoutesModels/TradingTypesModel';
import { setTradingTypesList } from 'redux/reducer/TradingTypes/tradingTypesReducer';

export const getAllTradingTypes = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.tradingTypesGetList, { recordsPerPage: 50 }).then((res: backendReponse<tradingTypes[]>) => {
    if (res.isSuccess) dispatch(setTradingTypesList(res.data));
  });
};
