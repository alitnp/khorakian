import React, { FC, useEffect, useState } from 'react';
import { Divider, Tabs } from 'antd';
import TabsLabel from '@/components/post/postDetail/comments/TabsLabel';
import TabsContent from '@/components/post/postDetail/comments/TabsContent';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
import WebApiService, { errorResponse } from '@/global/utils/WebApiService';
import { webApiCatch, webApiThenGeneric } from '@/global/utils/webApiThen';
import { ApiDataResponse, IPostComment, IPostCommentRead } from '@my/types';

interface IProps {
  comments: IPostCommentRead;
}

const AllCommentTabs: FC<IProps> = ({ comments }) => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<IPostComment>();

  //effect
  useEffect(() => {
    getAllComments;
    console.log(comments);
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  //func
  const getAllComments = async (id: string) => {
    setLoading(true);
    await WebApiService.get(webEndpointUrls.getAllPostComments)
      .then((res: ApiDataResponse<IPostComment>) =>
        webApiThenGeneric<ApiDataResponse<IPostComment>, IPostComment>({
          res,
          onSuccessData: (data) => {
            setCommentsList(data);
          },
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };

  console.log(commentsList);

  return (
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
};
export default AllCommentTabs;
