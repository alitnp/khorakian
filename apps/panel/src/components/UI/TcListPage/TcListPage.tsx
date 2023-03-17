import { Form, FormInstance } from 'antd';
import CollapseWrapper from 'components/UI/CollapseWrapper/CollapseWrapper';
import TcForm from 'components/UI/Form/TcForm';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
// import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcTable from 'components/UI/Table/TcTable';
import { ApiService } from 'config/API/ApiService';
import useQuery from 'global/helperFunctions/useQuery';
import { ITableColumn } from 'global/Models/globalModels';
import { FC, ReactNode, useEffect } from 'react';
import TcFormWrapper from '../FormWrapper/TcFormWrapper';

interface ITcListPage {
  columns: ITableColumn[];
  getList: (a: object, b: any) => void;
  loading: boolean;
  list: any;
  filterItems: ReactNode;
  defaultQuery?: object;
  additionalContent?: ReactNode;
  additionalMoreContent?: ReactNode;
  noPagination?: boolean;
  rowKey?: string;
  customForm?: FormInstance;
  handleAbort?: () => void;
}

const TcListPage: FC<ITcListPage> = ({
  columns,
  getList,
  loading,
  list,
  filterItems,
  defaultQuery = {},
  additionalContent,
  additionalMoreContent,
  customForm,
  rowKey,
  noPagination,
}) => {
  //hooks
  const [form] = Form.useForm();
  const { query, search, setQuery, resetQuary, pageNumber, pageSize, handlePagination } = useQuery();
  const apiService = new ApiService();

  //effect
  useEffect(() => {
    handleSearchChange(query, apiService);
    return () => apiService.abort();
  }, [search]);

  //functions
  const handleSearchChange = (values: any, apiService: any) => {
    if (customForm) {
      customForm.resetFields();
      customForm.setFieldsValue({ ...values });
    } else {
      form.resetFields();
      form.setFieldsValue({ ...values });
    }
    getList(values, apiService);
  };
  const handleSubmit = (values: object): void => setQuery({ ...defaultQuery, ...values, pageSize });

  return (
    <>
      {filterItems && (
        <CollapseWrapper>
          <TcForm form={customForm || form} onFinish={handleSubmit}>
            <TcFormWrapper>{filterItems}</TcFormWrapper>
            <TcFormButtons onCancel={() => resetQuary(defaultQuery)} />
          </TcForm>
        </CollapseWrapper>
      )}
      <>{additionalContent}</>

      <TcTable
        count={list?.totalItems}
        refetch={() => getList(query, apiService)}
        dataSource={list?.data || []}
        columns={columns}
        loading={loading}
        current={pageNumber}
        pageSize={pageSize}
        rowKey={rowKey}
      />
      {!noPagination && <TcPagination current={+pageNumber} pageSize={pageSize} total={list?.totalItems} onPaginationHandler={handlePagination} showLessItems={false} />}

      <>{additionalMoreContent}</>
    </>
  );
};

export default TcListPage;
