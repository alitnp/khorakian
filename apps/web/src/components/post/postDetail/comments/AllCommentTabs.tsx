import React, { FC, useMemo } from 'react';
import { Tabs } from 'antd';
import AllComments from '@/components/post/postDetail/comments/AllComments';
import { IPostCommentRead, IPostRead } from '@my/types';

interface IProps {
  comments: IPostCommentRead[];
  adminComments: IPostCommentRead[];
  post: IPostRead;
}

type adminComment = {
  tabInfo: { fullName: string; _id: string };
  tabBody: IPostCommentRead[];
};

const AllCommentTabs: FC<IProps> = ({ comments, adminComments, post }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const tabComments = useMemo(() => {
    const temptabComments: adminComment[] = [];
    adminComments.map((comment) => {
      if (
        !temptabComments.some(
          (adComm) => adComm.tabInfo._id === comment.user._id
        )
      )
        temptabComments.push({
          tabInfo: {
            fullName: comment.user.fullName,
            _id: comment.user._id,
          },
          tabBody: [],
        });
      const thisCommentAdminIndex = temptabComments.findIndex(
        (addComm) => addComm.tabInfo._id === comment.user._id
      );
      temptabComments[thisCommentAdminIndex].tabBody.push(comment);
    });
    return temptabComments;
  }, [adminComments]);

  const adminCommentTabs = useMemo(() => {
    return tabComments.map((tabComment) => ({
      label: tabComment.tabInfo.fullName,
      key: tabComment.tabInfo._id,
      children: <AllComments comments={tabComment.tabBody} post={post} />,
    }));
  }, [tabComments]);

  return (
    <Tabs
      onChange={onChange}
      className="max-w-screen-lg m-auto "
      type="card"
      items={[
        {
          label: 'همه',
          key: 'ALL',
          children: <AllComments comments={comments} post={post} />,
        },
        ...adminCommentTabs,
      ]}
    />
  );
};
export default AllCommentTabs;
