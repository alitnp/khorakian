import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import postModel from 'global/Models/postModel';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';

const Post: FC = () => {
  return (
    <TcListPageWrapper
      columns={postModel.columns}
      createRoute={routes.postCreate.path}
      deleteEndpoint={endpointUrls.postDelete}
      filterItems={postModel.filterInputs}
      getListEndpoint={endpointUrls.postGetList}
      title={postModel.title}
    />
  );
};

export default Post;
