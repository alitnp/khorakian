import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import defaultImageModel from 'global/Models/defaultImageModel';

const Experience: FC = () => {
  return (
    <TcListPageWrapper
      columns={defaultImageModel.columns}
      createRoute={routes.defaultImageCreate.path}
      deleteEndpoint={endpointUrls.defaultImageDelete}
      filterItems={defaultImageModel.filterInputs}
      getListEndpoint={endpointUrls.defaultImageGetList}
      title={defaultImageModel.title}
    />
  );
};

export default Experience;
