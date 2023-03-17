import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ApiService, { errorResponse } from 'config/API/ApiService';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import endpointUrls from 'global/Constants/endpointUrls';
import { AsyncSelectCustomStyle } from 'global/Constants/globalConstants';

const TcAsyncSelectPerson = ({ data, dispatchData, name, label, twiceDispatch }) => {
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();
  const [, setLoading] = useState(false);

  const handleAsyncSelectOptions = async (input, callBack) => {
    if (input?.length < 3) return;
    setLoading(true);

    await ApiService.post(endpointUrls.getPeople, { fullName_NationalId: input })
      .then((res) => {
        if (res.isSuccess) {
          dispatch(dispatchData({ [twiceDispatch]: { list: res.data } }));
          callBack(res?.data?.map((item) => ({ label: item.fullName, value: item.id })));
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
    dispatchData({ [twiceDispatch]: { id: Id, showDeleteBtn: true, record: selectedRecord } });
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>{data?.list?.length > 0 ? <DownOutlined style={{ fontSize: '12px' }} /> : <SearchOutlined />}</components.DropdownIndicator>
      )
    );
  };

  return (
    <TcFormItem label={label} name={name}>
      <AsyncSelect
        styles={AsyncSelectCustomStyle}
        classNamePrefix='react-select'
        components={{ DropdownIndicator }}
        noOptionsMessage={() => 'فرد مورد نظر یافت نشد نام و یا شماره ملی دیگری جستجو کنید'}
        loadingMessage={() => 'در حال جستجو ...'}
        showSearch
        placeholder={'جستجو و انتخاب کنید'}
        value={data.id}
        loadOptions={handleAsyncSelectOptions}
        onChange={(e) => handleChange(e.value)}
      />
    </TcFormItem>
  );
};
export default TcAsyncSelectPerson;
