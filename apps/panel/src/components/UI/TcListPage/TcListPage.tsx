import { Form, FormInstance } from 'antd';
import TcActorFilters from 'components/UI/ActorFilters/TcActorFilters';
import CollapseWrapper from 'components/UI/CollapseWrapper/CollapseWrapper';
import TcForm from 'components/UI/Form/TcForm';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
// import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcTable from 'components/UI/Table/TcTable';
import { ApiService } from 'config/API/ApiService';
import useQuery from 'global/helperFunctions/useQuery';
import { ITableColumn } from 'global/Models/globalModels';
import { FC, ReactNode, useEffect, useState } from 'react';
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
  //states
  const [isAdvanceOpen, setIsAdvanceOpen] = useState<boolean>(false);

  //hooks
  const [form] = Form.useForm();
  const { query, search, setQuery, resetQuary, pageNumber, recordsPerPage, handlePagination } = useQuery();
  const apiService = new ApiService();

  //effect
  useEffect(() => {
    handleSearchChange(query, apiService);
    handleOpenAdvanceFilters(query);
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
  const handleOpenAdvanceFilters = (query: any) => {
    if (query?.creationDate || query?.modificationDate || query?.modifierId || query?.creatorId) setIsAdvanceOpen(true);
  };
  const handleSubmit = (values: object): void => setQuery({ ...defaultQuery, ...values, recordsPerPage });

  return (
    <>
      {filterItems && (
        <CollapseWrapper>
          <TcForm form={customForm || form} onFinish={handleSubmit}>
            <TcFormWrapper>{filterItems}</TcFormWrapper>
            <TcFormButtons
              onCancel={() => resetQuary(defaultQuery)}
              advanceContent={<TcActorFilters />}
              isAdvanceOpen={isAdvanceOpen}
              onAdvanceClick={() => setIsAdvanceOpen((prevState) => !prevState)}
            />
          </TcForm>
        </CollapseWrapper>
      )}
      <>{additionalContent}</>

      <TcTable
        count={list?.totalItemCount}
        refetch={() => getList(query, apiService)}
        dataSource={list?.data || []}
        columns={columns}
        loading={loading}
        current={pageNumber}
        rowKey={rowKey}
      />
      {!noPagination && <TcPagination current={+pageNumber} pageSize={recordsPerPage} total={list?.totalItemCount} onPaginationHandler={handlePagination} showLessItems={false} />}

      <>{additionalMoreContent}</>
    </>
  );
};

export default TcListPage;
