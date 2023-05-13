import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import aboutMeModel from 'global/Models/aboutMeModel';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';

const AboutMe: FC = () => {
  return (
    <TcListPageWrapper
      columns={aboutMeModel.columns}
      createRoute={routes.aboutMeCreate.path}
      deleteEndpoint={endpointUrls.aboutMeDelete}
      filterItems={aboutMeModel.filterInputs}
      getListEndpoint={endpointUrls.aboutMeGetList}
      title={aboutMeModel.title}
    />
  );
};

export default AboutMe;
