import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { paymentTypes } from 'global/Models/genericRoutesModels/PaymentTypesModel';
import { setPaymentTypesList } from 'redux/reducer/paymentTypes/paymentTypesReducer';

export const getAllPaymentTypes = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.paymentTypesGetList, { recordsPerPage: 50 }).then((res: backendReponse<paymentTypes[]>) => {
    if (res.isSuccess) dispatch(setPaymentTypesList(res.data));
  });
};
