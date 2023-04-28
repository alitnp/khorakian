import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

const title = 'ترتیب آیتم';
const englishTitle = 'pageItemSorting';

const inputs: ReactNode = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان وارد نشده.' }]}>
      <TcInput />
    </TcFormItem>
  </>
);

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete: (_id: number) => void) => [
  {
    title: 'عنوان',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <div className='flex'>
        {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.pageItemSortingEdit.path + '/' + record._id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
      </div>
    ),
  },
];

const ListRoute = routes.pageItemSorting.path;
const createRoute = routes.pageItemSortingCreate.path;
const editRoute = routes.pageItemSortingEdit.path;
const detailRoute = routes.pageItemSortingDetail.path;

const listEndpoint = endpointUrls.pageItemSortingGetList;
const createEndpoint = endpointUrls.pageItemSortingCreate;
const editEndpoint = endpointUrls.pageItemSortingEdit;
const detailEndpoint = endpointUrls.pageItemSortingDetail;
const deleteEndpoint = endpointUrls.pageItemSortingDelete;

const pageItemSortingModel: routeModel = {
  title,
  englishTitle,
  inputs,
  filterInputs,
  columns,
  ListRoute,
  createRoute,
  editRoute,
  detailRoute,
  deleteEndpoint,
  listEndpoint,
  editEndpoint,
  detailEndpoint,
  createEndpoint,
};

export default pageItemSortingModel;
