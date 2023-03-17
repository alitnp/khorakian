import SetSignalResultModal from 'components/pages/Signals/components/SetSignalResultModal';
import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcSelectSearch from 'components/UI/Form/Inputs/TcSelectSearch';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { backendReponse } from 'global/Models/globalModels';
import { signal, signalColumns } from 'global/Models/SignalModels';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimeFrames } from 'redux/reducer/TimeFrames/getAllTimeFrames';
import { getAllTradingTypes } from 'redux/reducer/TradingTypes/getAllTradingTypes';

interface IMySignals {}

const MySignals: FC<IMySignals> = () => {
  //states
  const [signals, setSignals] = useState<backendReponse<signal[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [signalResultdetail, setSignalResultDetail] = useState<signal | undefined>();

  //dispatch
  const dispatch = useDispatch();
  const { query } = useQuery();
  const apiCatcher = useApiCatcher();

  //functions
  const getSignals = async (query: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.signalGetList, query).then((res: backendReponse<signal[]>) =>
      handleApiThen({ res, dispatch, onSuccess: setSignals, notifFail: false, notifSuccess: false })
    );
    setLoading(false);
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    await ApiService.delete(endpointUrls.signalDelete + '?id=' + id)
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => getSignals(query), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const filterItems = (
    <>
      <TcFormItem label='نماد' name='symbolId'>
        <TcSelectSearch searchEndpoint={endpointUrls.symbolsGetList} />
      </TcFormItem>
      <TcFormItem label='تایم فریم' name='timeFrameId'>
        <TcSelectReduxSearch reducerName='timeFrames' reducerListProperty='list' getlist={getAllTimeFrames} />
      </TcFormItem>
      <TcFormItem label='نوع معامله' name='tradingTypeId'>
        <TcSelectReduxSearch reducerName='tradingTypes' reducerListProperty='list' getlist={getAllTradingTypes} />
      </TcFormItem>
      <TcFormItem label='پیپ مورد انتظار' name='expectedPips'>
        <TcInput />
      </TcFormItem>
    </>
  );

  return (
    <TcCard>
      <TcPageTitle title='سیگنال' buttonText='ثبت' to={routes.signalCreate.path} />
      <TcListPage list={signals} getList={getSignals} columns={signalColumns(handleDelete, setSignalResultDetail)} filterItems={filterItems} loading={loading} />
      <SetSignalResultModal signal={signalResultdetail} close={() => setSignalResultDetail(undefined)} />
    </TcCard>
  );
};

export default MySignals;
