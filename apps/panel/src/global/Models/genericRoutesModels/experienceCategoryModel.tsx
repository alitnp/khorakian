import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { routeModel } from 'global/Models/globalModels';
import { ReactNode } from 'react';

const title = 'دسته بندی تجربه ها';
const englishTitle = 'ideaCategory';

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
        <TcEditIcon to={routes.experienceCategoryEdit.path + '/' + record._id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
      </div>
    ),
  },
];

const ListRoute = routes.experienceCategory.path;
const createRoute = routes.experienceCategoryCreate.path;
const editRoute = routes.experienceCategoryEdit.path;
const detailRoute = routes.experienceCategoryDetail.path;

const listEndpoint = endpointUrls.experienceCategoryGetList;
const createEndpoint = endpointUrls.experienceCategoryCreate;
const editEndpoint = endpointUrls.experienceCategoryEdit;
const detailEndpoint = endpointUrls.experienceCategoryDetail;
const deleteEndpoint = endpointUrls.experienceCategoryDelete;

const experienceCategoryModel: routeModel = {
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

export default experienceCategoryModel;
