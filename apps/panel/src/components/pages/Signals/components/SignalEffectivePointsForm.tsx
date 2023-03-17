import TcDevider from 'components/UI/Devider/TcDevider';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import { getEnglishDouble } from 'global/default';
import { createSignalEffectivePoint } from 'global/Models/SignalModels';
import { ChangeEvent, FC } from 'react';

interface ISignalEffectivePointsForm {
  ept: createSignalEffectivePoint[];
  setEpt: (_ept: createSignalEffectivePoint[]) => void;
}

const SignalEffectivePointsForm: FC<ISignalEffectivePointsForm> = ({ ept, setEpt }) => {
  //functions
  const handleChange = (input: string, index: number) => {
    const value = getEnglishDouble(input);
    const tempEpt = [...ept];
    tempEpt[index].point = value;
    setEpt([...tempEpt]);
  };

  return (
    <>
      <TcDevider>نقاط اثرگذار</TcDevider>
      <TcForm>
        <TcFormWrapper>
          {ept.map((item, index) => (
            <TcFormItem key={item.typeId} label={item.title}>
              <TcInput value={item.point} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)} placeholder='وارد نشده' />
            </TcFormItem>
          ))}
        </TcFormWrapper>
      </TcForm>
    </>
  );
};

export default SignalEffectivePointsForm;
