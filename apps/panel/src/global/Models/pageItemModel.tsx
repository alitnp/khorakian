import { IPageItemSorting, IPageItemStyle, IPageItemType } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

const title = 'آیتم صفحه';
const englishTitle = 'pageItem';

const inputs: ReactNode = <></>;

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete: (_id: number) => void) => [
  {
    title: 'عنوان اصلی',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'عنوان فرعی',
    key: 'subTitle',
    dataIndex: 'subTitle',
  },
  {
    title: 'ردیف',
    key: 'index',
    dataIndex: 'index',
  },
  {
    title: 'نوع',
    key: 'type',
    dataIndex: 'type',
    render: (text: IPageItemType) => text?.title,
  },
  {
    title: 'ترتیب',
    key: 'sorting',
    dataIndex: 'sorting',
    render: (text: IPageItemSorting) => text?.title,
  },
  {
    title: 'ظاهر',
    key: 'style',
    dataIndex: 'style',
    render: (text: IPageItemStyle) => text?.title,
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <div className='flex'>
        {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.pageItemEdit.path + '/' + record._id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
      </div>
    ),
  },
];

const ListRoute = routes.pageItem.path;
const createRoute = routes.pageItemCreate.path;
const editRoute = routes.pageItemEdit.path;
const detailRoute = routes.pageItemDetail.path;

const listEndpoint = endpointUrls.pageItemGetList;
const createEndpoint = endpointUrls.pageItemCreate;
const editEndpoint = endpointUrls.pageItemEdit;
const detailEndpoint = endpointUrls.pageItemDetail;
const deleteEndpoint = endpointUrls.pageItemDelete;

const pageItemModel: routeModel = {
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

export default pageItemModel;
