import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { basicActors, routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

export interface effectivePointTypes extends basicActors {
  id?: number;
  title: string;
  description: string;
}

const title = 'نقاط اثرگذار';
const englishTitle = 'effectivePointTypes';

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
        {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.effectivePointTypesEdit.path + '/' + record.id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record.id)} />
      </div>
    ),
  },
];

const ListRoute = routes.effectivePointTypes.path;
const createRoute = routes.effectivePointTypesCreate.path;
const editRoute = routes.effectivePointTypesEdit.path;
const detailRoute = routes.effectivePointTypesDetail.path;

const listEndpoint = endpointUrls.effectivePointTypesGetList;
const createEndpoint = endpointUrls.effectivePointTypesCreate;
const editEndpoint = endpointUrls.effectivePointTypesEdit;
const detailEndpoint = endpointUrls.effectivePointTypesGetDetail;
const deleteEndpoint = endpointUrls.effectivePointTypesDelete;

const effectivePointTypesModel: routeModel = {
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

export default effectivePointTypesModel;
