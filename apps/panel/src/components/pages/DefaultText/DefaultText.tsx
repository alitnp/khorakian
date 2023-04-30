import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import defaultTextModel from 'global/Models/defaultTextModel';

const DefaultText: FC = () => {
  return (
    <TcListPageWrapper
      columns={defaultTextModel.columns}
      createRoute={routes.defaultTextCreate.path}
      deleteEndpoint={endpointUrls.defaultTextDelete}
      filterItems={defaultTextModel.filterInputs}
      getListEndpoint={endpointUrls.defaultTextGetList}
      title={defaultTextModel.title}
    />
  );
};

export default DefaultText;
