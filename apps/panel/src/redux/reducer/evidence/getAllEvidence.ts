import endpointUrls from 'global/Constants/endpointUrls';
import ApiService from 'config/API/ApiService';
import { backendReponse } from 'global/Models/globalModels';
import { Dispatch } from 'redux';
import { setEvidenceList } from 'redux/reducer/evidence/evidenceReducer';
import { evidences } from 'global/Models/genericRoutesModels/EvidencesModel';

export const getAllEvidence = () => async (dispatch: Dispatch) => {
  await ApiService.post(endpointUrls.evidencesGetList, { recordsPerPage: 50 }).then((res: backendReponse<evidences[]>) => {
    if (res.isSuccess) dispatch(setEvidenceList(res.data));
  });
};
