import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { basicActors, routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

export interface signalTypes extends basicActors {
  title: string;
  description: string;
}

const title = 'نوع سیگنال';
const englishTitle = 'signalTypes';

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
        {/* <TcDetailIcon to={routes.signalTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.signalTypesEdit.path + '/' + record.id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record.id)} />
      </div>
    ),
  },
];

const ListRoute = routes.signalTypes.path;
const createRoute = routes.signalTypesCreate.path;
const editRoute = routes.signalTypesEdit.path;
const detailRoute = routes.signalTypesDetail.path;

const listEndpoint = endpointUrls.signalTypesGetList;
const createEndpoint = endpointUrls.signalTypesCreate;
const editEndpoint = endpointUrls.signalTypesEdit;
const detailEndpoint = endpointUrls.signalTypesGetDetail;
const deleteEndpoint = endpointUrls.signalTypesDelete;

const signalTypesModel: routeModel = {
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

export default signalTypesModel;
