import React, { FC } from 'react';
import { Tabs } from 'antd';
import TabsLabel from '@/components/post/postDetail/comments/TabsLabel';
import TabsContent from '@/components/post/postDetail/comments/TabsContent';
import { IPostCommentRead } from '@my/types';

interface IProps {
  comments: IPostCommentRead;
}

const AllCommentTabs: FC<IProps> = ({ comments }) => {
  // state
  // const [loading, setLoading] = useState<boolean>(false);
  // const [commentsList, setCommentsList] = useState<IPostComment>();

  const onChange = (key: string) => {
    console.log(key);
  };

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

  console.log(comments);

  return (
    <Tabs
      onChange={onChange}
      className=" max-w-screen-lg m-auto"
      type="card"
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: <TabsLabel comments={comments} />,
          key: id,
          children: <TabsContent comments={comments} />,
        };
      })}
    />
  );
};
export default AllCommentTabs;
