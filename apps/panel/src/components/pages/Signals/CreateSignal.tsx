import { Form } from 'antd';
import TcCard from 'components/UI/Card/TcCard';
import TcForm from 'components/UI/Form/TcForm';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { FC, useEffect, useState } from 'react';
import { convertFormValuesToEnglishDouble, convertFormValuesToEnglishNumber } from 'global/default';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import ApiService, { errorResponse } from 'config/API/ApiService';
import { useHistory } from 'react-router';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { useDispatch, useSelector } from 'react-redux';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { createSignalEffectivePoint, signalInputs } from 'global/Models/SignalModels';
import { RootState } from 'redux/store';
import { getAllEffectivePointTypes } from 'redux/reducer/effectivePointTypes/getAllEffectivePointTypes';
import SignalEffectivePointsForm from 'components/pages/Signals/components/SignalEffectivePointsForm';

const shouldBeNumberInputs = ['investmentValuePercent', 'achievedPips'];

const shouldBeDouble = ['entryPoint', 'expectedPips', 'lotSize'];

const CreateSignal: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [signalEffectivePoints, setSignalEffectivePoints] = useState<createSignalEffectivePoint[]>([]);
  const effectivePointTypes = useSelector((state: RootState) => state.effectivePointTypes);

  //hooks
  const [form] = Form.useForm();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //effect
  useEffect(() => {
    !effectivePointTypes.list && dispatch(getAllEffectivePointTypes());
    if (effectivePointTypes.list) {
      const effectiveTypes = effectivePointTypes.list.map((ept) => ({ point: '', title: ept.title, typeId: ept.id })) as createSignalEffectivePoint[];
      setSignalEffectivePoints(effectiveTypes);
    }
  }, []);

  //functions
  const handleChange = (value: any, values: any) => {
    convertFormValuesToEnglishNumber(value, values, shouldBeNumberInputs, form, true);
    convertFormValuesToEnglishDouble(value, values, shouldBeDouble, form);
  };
  const handleSubmit = async (values: any) => {
    // shouldBeNumberInputs.map((key) => {
    //   values[key] = parseInt(values[key] || 0);
    // });
    values.signalEffectivePoints = signalEffectivePoints.map((sep) => ({ point: sep.point, effectivePointTypeId: sep.typeId }));
    setLoading(true);
    await ApiService.post(endpointUrls.signalCreate, values)
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.signal.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.signal.path }}>
      <TcPageTitle title='ایجاد سیگنال' />
      <TcForm form={form} onValuesChange={handleChange} onFinish={handleSubmit}>
        {signalInputs}
      </TcForm>
      <SignalEffectivePointsForm ept={signalEffectivePoints} setEpt={setSignalEffectivePoints} />
      {/* <SignalCreateImage image={image} setImage={setImage} /> */}
      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default CreateSignal;
