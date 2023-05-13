import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import experienceModel from 'global/Models/experienceModel';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';

const Experience: FC = () => {
  return (
    <TcListPageWrapper
      columns={experienceModel.columns}
      createRoute={routes.experienceCreate.path}
      deleteEndpoint={endpointUrls.experienceDelete}
      filterItems={experienceModel.filterInputs}
      getListEndpoint={endpointUrls.experienceGetList}
      title={experienceModel.title}
    />
  );
};

export default Experience;
