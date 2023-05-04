import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import historyModel from 'global/Models/historyModel';

const DefaultText: FC = () => {
  return (
    <TcListPageWrapper
      columns={historyModel.columns}
      createRoute={routes.historyCreate.path}
      deleteEndpoint={endpointUrls.historyDelete}
      filterItems={historyModel.filterInputs}
      getListEndpoint={endpointUrls.historyGetList}
      title={historyModel.title}
    />
  );
};

export default DefaultText;
