import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import { FC, useState } from 'react';

const PostCreate = () => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />
    </TcCard>
  );
};

export default PostCreate;
