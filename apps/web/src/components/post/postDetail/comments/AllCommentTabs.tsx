import React, { FC, useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import AllComments from '@/components/post/postDetail/comments/AllComments';
import { ApiDataResponse, IGlobalCommentRead } from '@my/types';
import WebApiService, { errorResponse } from '@/global/utils/WebApiService';
import { webApiCatch, webApiThen } from '@/global/utils/webApiThen';

interface IProps {
  endPointUrlGetAllComments: string;
  endPointUrlGetAllAdminComments: string;
  endPointUrlGetAllMyComments: string;
  parentId: number | string;
  commentCreateUrl: string;
}

type adminComment = {
  tabInfo: { fullName: string; _id: string };
  tabBody: IGlobalCommentRead[];
};

const AllCommentTabs: FC<IProps> = ({
  endPointUrlGetAllComments,
  endPointUrlGetAllAdminComments,
  endPointUrlGetAllMyComments,
  parentId,
  commentCreateUrl,
}) => {
  //state
  const [_loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<IGlobalCommentRead[]>();
  const [adminComments, setAdminComments] = useState<IGlobalCommentRead[]>();
  const [myComments, setMyComments] = useState<IGlobalCommentRead[]>();

  //effect
  useEffect(() => {
    !comments && getComments();
    !adminComments && getAllAdminComments();
    !myComments && getAllMyComments();
  }, []);

  //func
  const getComments = async () => {
    setLoading(true);
    await WebApiService.get(
      endPointUrlGetAllComments + '?pageSize=100&content=' + parentId
    )
      .then((res: ApiDataResponse<IGlobalCommentRead>) =>
        webApiThen({
          res,
          notifFail: false,
          notifSuccess: false,
          onSuccess: (res) => {
            setComments(res.data);
            // route && push(webRoutes.route.path), refetch && refetch, close;
          },
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };
  const getAllAdminComments = async () => {
    setLoading(true);
    await WebApiService.get(
      endPointUrlGetAllAdminComments + '?pageSize=50&content=' + parentId
    )
      .then((res: ApiDataResponse<IGlobalCommentRead>) =>
        webApiThen({
          res,
          notifFail: false,
          notifSuccess: false,
          onSuccess: (res) => {
            setAdminComments(res.data);
          },
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };
  const getAllMyComments = async () => {
    setLoading(true);
    await WebApiService.get(endPointUrlGetAllMyComments + '/' + parentId)
      .then((res: ApiDataResponse<IGlobalCommentRead>) =>
        webApiThen({
          res,
          notifFail: false,
          notifSuccess: false,
          onSuccess: (res) => {
            setMyComments(res.data);
          },
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  //seprate admins tab
  const tabComments = useMemo(() => {
    const temptabComments: adminComment[] = [];
    adminComments?.map((comment) => {
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
      children: (
        <AllComments
          refetch={refetch}
          comments={tabComment.tabBody}
          parentId={parentId}
          commentCreateUrl={commentCreateUrl}
        />
      ),
    }));
  }, [tabComments]);

  const refetch = () => {
    getAllAdminComments();
    getAllMyComments();
    getComments();
  };

  return (
    <Tabs
      onChange={onChange}
      className="max-w-screen-lg m-auto "
      type="card"
      items={[
        {
          label: 'همه',
          key: 'ALL',
          children: (
            <AllComments
              comments={comments}
              parentId={parentId}
              refetch={refetch}
              commentCreateUrl={commentCreateUrl}
            />
          ),
        },
        {
          label: 'نظرات من',
          key: 'MYCOMMENT',
          children: (
            <AllComments
              comments={myComments}
              parentId={parentId}
              refetch={refetch}
              commentCreateUrl={commentCreateUrl}
            />
          ),
        },
        ...adminCommentTabs,
      ]}
    />
  );
};
export default AllCommentTabs;
