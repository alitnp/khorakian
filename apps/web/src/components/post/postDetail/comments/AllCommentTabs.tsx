import React, { FC } from 'react';
import { Divider, Tabs } from 'antd';
import TabsLabel from '@/components/post/postDetail/comments/TabsLabel';
import TabsContent from '@/components/post/postDetail/comments/TabsContent';

const onChange = (key: string) => {
  console.log(key);
};

const AllCommentTabs: FC = () => (
  <Tabs
    onChange={onChange}
    className=" max-w-screen-lg m-auto"
    type="card"
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: <TabsLabel />,
        key: id,
        children: <TabsContent />,
      };
    })}
  />
);

export default AllCommentTabs;
