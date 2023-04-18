import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { FC } from 'react';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import ideaModel from 'global/Models/ideaModel';

const Idea: FC = () => {
  return (
    <TcListPageWrapper
      columns={ideaModel.columns}
      createRoute={routes.ideaCreate.path}
      deleteEndpoint={endpointUrls.ideaDelete}
      filterItems={ideaModel.filterInputs}
      getListEndpoint={endpointUrls.ideaGetList}
      title={ideaModel.title}
      additionalPayload={{ isAdminSubmitted: true }}
    />
  );
};

export default Idea;
