import { Form } from 'antd';
import CollapseWrapper from 'components/UI/CollapseWrapper/CollapseWrapper';
import TcForm from 'components/UI/Form/TcForm';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcTable from 'components/UI/Table/TcTable';
import useQueryNoLocation from 'global/helperFunctions/useQueryNoLocation';
import { ITableColumn } from 'global/Models/globalModels';
import { FC, ReactNode, useEffect } from 'react';
import TcFormWrapper from '../FormWrapper/TcFormWrapper';

interface ITcListPageNoLocation {
  columns: ITableColumn[];
  getList: (a: object) => void;
  loading: boolean;
  list: any;
  filterItems: ReactNode;
  payload: object;
}

const TcListPageNoLocation: FC<ITcListPageNoLocation> = ({ payload = {}, columns, getList, loading, list, filterItems }) => {
  //hooks
  const [form] = Form.useForm();
  const { setQuery, query, pageSize, pageNumber, resetQuery, handlePagination } = useQueryNoLocation();

  //effect
  useEffect(() => {
    form.setFieldsValue({ ...query });
    getList({ ...query, ...payload });
  }, [query, payload]);

  //functions
  const handleSubmit = (values: object): void => {
    setQuery({ ...values, pageSize });
  };

  return (
    <>
      {filterItems && (
        <CollapseWrapper>
          <TcForm form={form} onFinish={handleSubmit}>
            <TcFormWrapper>{filterItems}</TcFormWrapper>
            <TcFormButtons onCancel={resetQuery} />
          </TcForm>
        </CollapseWrapper>
      )}
      <TcTable count={list?.totalItems} refetch={() => getList({ ...query, ...payload })} dataSource={list?.data || []} columns={columns} loading={loading} />
      <TcPagination current={pageNumber} pageSize={pageSize} total={list?.totalItems} onPaginationHandler={handlePagination} />
    </>
  );
};

export default TcListPageNoLocation;
