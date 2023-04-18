import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import userExperienceModel from 'global/Models/userExperienceModel';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';

const UserExperience: FC = () => {
  return (
    <TcListPageWrapper
      columns={userExperienceModel.columns}
      // deleteEndpoint={endpointUrls.userExperienceDelete}
      filterItems={userExperienceModel.filterInputs}
      getListEndpoint={endpointUrls.userExperienceGetList}
      title={userExperienceModel.title}
    />
  );
};

export default UserExperience;
