import { SelectProps } from 'antd';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import ApiService from 'config/API/ApiService';
import { FC, useEffect, useState } from 'react';
import queryString from 'query-string';

interface ITcSelectSearch extends SelectProps {
  value?: string | number | undefined | null;
  searchEndpoint: string;
  labelPropertyName?: string;
  idPropertyName?: string;
  onChangeFullInfo?: (a: any) => void;
  onChange?: (a: string | number) => void;
  parentPropertyName?: string;
}

const TcSelectSearch: FC<ITcSelectSearch> = ({
  value,
  searchEndpoint,
  idPropertyName = '_id',
  parentPropertyName,
  labelPropertyName = 'title',
  onChangeFullInfo,
  onChange,
  ...props
}) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>('');

  //effect
  useEffect(() => {
    if (value) getById(value);
  }, [value]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchPhrase);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchPhrase]);

  //functions
  const getById = async (id: string | number) => {
    setLoading(true);
    await ApiService.get(searchEndpoint + '?' + queryString.stringify({ [idPropertyName]: id }))
      .then((res: any) => {
        if (res.isSuccess) setOptionsList(res.data);
        else setOptionsList([]);
      })
      .catch(() => {});
    setLoading(false);
  };

  const handleSearch = async (input: string) => {
    if (!input || input.length < 1) return;
    setLoading(true);
    await ApiService.get(searchEndpoint + '?' + queryString.stringify({ [labelPropertyName]: input }))
      .then((res: any) => {
        if (res.isSuccess) setOptionsList(res.data);
        else setOptionsList([]);
      })
      .catch(() => {});
    setLoading(false);
  };

  //functions
  const handleChange = (e: any) => {
    onChange && onChange(e);
    if (onChangeFullInfo) {
      const item = optionsList?.find((item: any) => item.id === e);
      onChangeFullInfo({ ...item, label: item.title, value: item._id });
    }
  };

  return (
    <TcSelect
      showSearch
      allowClear
      loading={loading}
      placeholder='تایپ کنید'
      optionFilterProp='children'
      onSearch={setSearchPhrase}
      filterOption={false}
      options={optionsList?.map((item) => ({ label: parentPropertyName ? item[parentPropertyName][labelPropertyName] : item[labelPropertyName], value: item._id }))}
      {...props}
      onChange={handleChange}
    />
  );
};

export default TcSelectSearch;
