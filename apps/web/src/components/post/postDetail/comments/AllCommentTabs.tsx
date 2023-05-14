import React, { FC } from 'react';
import { Tabs } from 'antd';
import AllComments from '@/components/post/postDetail/comments/AllComments';
import { IPostCommentRead } from '@my/types';
import TabAdminComment from '@/components/post/postDetail/comments/TabAdminComment';
import TabsLabel from '@/components/post/postDetail/comments/TabsLabel';

interface IProps {
  comments?: IPostCommentRead[];
  adminComments?: IPostCommentRead[];
}

const AllCommentTabs: FC<IProps> = ({ comments, adminComments }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  console.log(adminComments);

  return (
    <Tabs
      onChange={onChange}
      className=" max-w-screen-lg m-auto"
      type="card"
      items={[
        {
          label: 'همه',
          key: 'ALL',
          children: <AllComments comments={comments} />,
        },
        {
          label: <TabsLabel comments={comments} />,
          key: 'Admin',
          children: <TabAdminComment adminComments={adminComments} />,
        },
      ]}
    />
  );
};
export default AllCommentTabs;
