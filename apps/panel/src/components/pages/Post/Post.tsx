import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import routes from 'global/Constants/routes';
import { FC } from 'react';

const Post: FC = () => {
  return (
    <TcCard>
      <TcPageTitle title='پست ها' to={routes.postCreate.path} />
    </TcCard>
  );
};

export default Post;
