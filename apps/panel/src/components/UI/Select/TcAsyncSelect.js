import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ApiService, { errorResponse } from 'config/API/ApiService';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { AsyncSelectCustomStyle } from 'global/Constants/globalConstants';

const TcAsyncSelect = ({ data, className, dispatchData, noOptionsMessage, api, name, label, twiceDispatch, attribute, secondAttribute, type, rules = [], specificFieldId }) => {
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();
  const [, setLoading] = useState(false);

  const handleAsyncSelectOptions = async (input, callBack) => {
    if (input?.length < 2) return;
    setLoading(true);

    await ApiService.post(api, { [type]: input })
      .then((res) => {
        if (res.isSuccess) {
          dispatch(twiceDispatch ? dispatchData({ [twiceDispatch]: { list: res.data } }) : dispatchData({ list: res.data }));
          callBack(
            res?.data?.map((item) => ({
              label: secondAttribute ? item[attribute]?.[secondAttribute] : item[attribute],
              value: specificFieldId ? item[specificFieldId].id : item.id,
            }))
          );
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        apiCatcher(errorResponse);
      });
  };

  const handleChange = (Id) => {
    const selectedRecord = data?.list?.find((item) => item.id === Id);
    dispatch(
      twiceDispatch
        ? dispatchData({ [twiceDispatch]: { id: Id, showDeleteBtn: true, record: selectedRecord } })
        : dispatchData({ id: Id, showDeleteBtn: true, record: selectedRecord })
    );
  };
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>{data?.list?.length > 0 ? <DownOutlined style={{ fontSize: '12px' }} /> : <SearchOutlined />}</components.DropdownIndicator>
      )
    );
  };

  return (
    <TcFormItem label={label} name={name} rules={rules} className={className}>
      <AsyncSelect
        styles={AsyncSelectCustomStyle}
        classNamePrefix='react-select'
        components={{ DropdownIndicator }}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => 'در حال جستجو ...'}
        showSearch
        placeholder={'جستجو و انتخاب کنید'}
        value={data.id}
        // defaultOptions={data?.list?.map((item) => ({ label: secondAttribute ? item[attribute]?.[secondAttribute] : item[attribute], value: item.id, key: item.id }))}
        loadOptions={handleAsyncSelectOptions}
        onChange={(e) => handleChange(e.value)}
      />
    </TcFormItem>
  );
};
export default TcAsyncSelect;
