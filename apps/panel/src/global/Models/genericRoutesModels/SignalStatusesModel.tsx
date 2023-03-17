import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { basicActors, routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

export interface signalStatuses extends basicActors {
  title: string;
  description: string;
}

const title = 'وضعیت سیگنال';
const englishTitle = 'signalStatuses';

const inputs: ReactNode = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان وارد نشده.' }]}>
      <TcInput />
    </TcFormItem>
    <TcFormItem name='description' label='شرح'>
      <TcTextarea />
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
    title: 'شرح',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <div className='flex'>
        {/* <TcDetailIcon to={routes.signalStatusesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.signalStatusesEdit.path + '/' + record.id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record.id)} />
      </div>
    ),
  },
];

const ListRoute = routes.signalStatuses.path;
const createRoute = routes.signalStatusesCreate.path;
const editRoute = routes.signalStatusesEdit.path;
const detailRoute = routes.signalStatusesDetail.path;

const listEndpoint = endpointUrls.signalStatusesGetList;
const createEndpoint = endpointUrls.signalStatusesCreate;
const editEndpoint = endpointUrls.signalStatusesEdit;
const detailEndpoint = endpointUrls.signalStatusesGetDetail;
const deleteEndpoint = endpointUrls.signalStatusesDelete;

const signalStatusesModel: routeModel = {
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

export default signalStatusesModel;
