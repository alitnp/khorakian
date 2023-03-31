import { SelectProps } from 'antd';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ITcSelectReduxSearch extends SelectProps {
  value?: string | number | undefined | null;
  labelPropertyName?: string;
  reducerName: string;
  reducerListProperty: string;
  getlist: () => void;
  onChange?: (a: string | number) => void;
  onChangeFullInfo?: (a: any) => void;
  underValue?: boolean;
}

const TcSelectReduxSearch: FC<ITcSelectReduxSearch> = ({
  value,
  reducerName,
  reducerListProperty,
  underValue,
  onChange,
  onChangeFullInfo,
  getlist,
  labelPropertyName = 'title',
  ...props
}) => {
  //states
  const state = useSelector((state: any) => state[reducerName]);
  const optionsList = underValue ? state.value[reducerListProperty] : state[reducerListProperty];

  //hooks
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    !optionsList && dispatch(getlist());
  }, []);

  //functions
  const handleChange = (e: any) => {
    onChange && onChange(e);
    if (onChangeFullInfo) {
      const item = optionsList?.find((item: any) => item._id === e);
      onChangeFullInfo({ ...item, label: item.title, value: item._id });
    }
  };

  return (
    <TcSelect
      showSearch
      allowClear
      loading={!optionsList}
      placeholder='انتخاب کنید'
      optionFilterProp='children'
      options={optionsList?.map((item: any) => ({ label: item[labelPropertyName], value: item._id }))}
      {...props}
      onChange={handleChange}
      value={value}
    />
  );
};

export default TcSelectReduxSearch;
