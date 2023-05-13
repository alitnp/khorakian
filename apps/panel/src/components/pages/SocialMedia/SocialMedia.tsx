import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import socialMediaModel from 'global/Models/socialMediaModel';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';

const SocialMedia: FC = () => {
  return (
    <TcListPageWrapper
      columns={socialMediaModel.columns}
      createRoute={routes.socialMediaCreate.path}
      deleteEndpoint={endpointUrls.socialMediaDelete}
      filterItems={socialMediaModel.filterInputs}
      getListEndpoint={endpointUrls.socialMediaGetList}
      title={socialMediaModel.title}
    />
  );
};

export default SocialMedia;
