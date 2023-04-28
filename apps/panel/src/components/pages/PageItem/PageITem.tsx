import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import pageItemModel from 'global/Models/pageItemModel';
import { FC } from 'react';

const PageITem: FC = () => {
  return (
    <TcListPageWrapper
      columns={pageItemModel.columns}
      createRoute={routes.pageItemCreate.path}
      deleteEndpoint={endpointUrls.pageItemDelete}
      filterItems={pageItemModel.filterInputs}
      getListEndpoint={endpointUrls.pageItemGetList}
      title={pageItemModel.title}
    />
  );
};

export default PageITem;
