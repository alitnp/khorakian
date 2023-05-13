import React, { FC } from 'react';
import { Tabs } from 'antd';
import TabsLabel from '@/components/post/postDetail/comments/TabsLabel';
import TabsContent from '@/components/post/postDetail/comments/TabsContent';
import { IPostCommentRead } from '@my/types';

interface IProps {
  comments: IPostCommentRead[];
  adminComments: IPostCommentRead[];
}

const AllCommentTabs: FC<IProps> = ({ comments, adminComments }) => {
  // state
  // const [loading, setLoading] = useState<boolean>(false);
  // const [commentsList, setCommentsList] = useState<IPostComment>();

  //func
  // const getAllComments = async (id: string) => {
  //   setLoading(true);
  //   await WebApiService.get(webEndpointUrls.getAllPostComments)
  //     .then((res: ApiDataResponse<IPostComment>) =>
  //       webApiThenGeneric<ApiDataResponse<IPostComment>, IPostComment>({
  //         res,
  //         onSuccessData: (data) => {
  //           setCommentsList(data);
  //         },
  //         notifFail: true,
  //         notifSuccess: true,
  //       })
  //     )
  //     .catch(() => webApiCatch(errorResponse));
  //   setLoading(false);
  // };

  const onChange = (key: string) => {
    console.log(key);
  };

  console.log(comments);

  return (
    <Tabs
      onChange={onChange}
      className=" max-w-screen-lg m-auto"
      type="card"
      items={[
        {
          label: 'همه',
          key: 'ALL',
          children: <TabsContent comments={comments} />,
        },
        {
          label: 'ادمین',
          key: 'admin',
          children: <TabsContent adminComments={adminComments} />,
        },
      ]}
    />
  );
};
export default AllCommentTabs;
