import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

const title = 'روت های سایت';
const englishTitle = 'frontEndRoute';

const inputs: ReactNode = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان وارد نشده.' }]}>
      <TcInput placeholder='عنوان' />
    </TcFormItem>
    <TcFormItem name='path' label='یو آر ال' rules={[{ required: true, message: 'یو آر ال وارد نشده.' }]}>
      <TcInput placeholder='یو آر ال' />
    </TcFormItem>
  </>
);

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput placeholder='عنوان' />
    </TcFormItem>
    <TcFormItem name='path' label='یو آر ال'>
      <TcInput placeholder='یو آر ال' />
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
    title: 'یو آر ال',
    key: 'path',
    dataIndex: 'path',
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <div className='flex'>
        {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.frontEndRouteEdit.path + '/' + record._id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
      </div>
    ),
  },
];

const ListRoute = routes.frontEndRoute.path;
const createRoute = routes.frontEndRouteCreate.path;
const editRoute = routes.frontEndRouteEdit.path;
const detailRoute = routes.frontEndRouteDetail.path;

const listEndpoint = endpointUrls.frontEndRouteGetList;
const createEndpoint = endpointUrls.frontEndRouteCreate;
const editEndpoint = endpointUrls.frontEndRouteEdit;
const detailEndpoint = endpointUrls.frontEndRouteDetail;
const deleteEndpoint = endpointUrls.frontEndRouteDelete;

const frontEndRouteModel: routeModel = {
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

export default frontEndRouteModel;
