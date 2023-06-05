import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import directMessageModel from 'global/Models/directMessageModel';
import routes from 'global/Constants/routes';

const DirectMessage: FC = () => {
  return (
    <TcListPageWrapper
      columns={directMessageModel.columns}
      // createRoute={routes.directMessageCreate.path}
      // deleteEndpoint={endpointUrls.directMessageDelete}
      filterItems={directMessageModel.filterInputs}
      getListEndpoint={endpointUrls.directMessageGetList}
      title={directMessageModel.title}
    />
  );
};

export default DirectMessage;
