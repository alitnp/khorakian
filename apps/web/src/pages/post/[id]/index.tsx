import { ApiDataResponse, IPostCommentRead, IPostRead } from '@my/types';
import { FC, memo } from 'react';
import PostDetailSlider from '@/components/post/postDetail/PostDetailSlider';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
import AllCommentTabs from '@/components/post/postDetail/comments/AllCommentTabs';
import PostDetailDescription from '@/components/post/postDetail/PostDetailDescription';
import { GetServerSideProps } from 'next';
import { serverSideFetch } from '@/global/utils/webFetch';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await serverSideFetch<ApiDataResponse<IPostRead>>(
    webEndpointUrls.getPostDetail(context?.params?.id as string),
    context.req
  );

  const comments = await serverSideFetch<ApiDataResponse<IPostCommentRead>>(
    webEndpointUrls.getAllPostComments(
      (context?.params?.id as string) +
        '?pageSize=50&postId=' +
        context?.params?.id
    ),
    context.req
  );

  return {
    props: {
      post: post.data,
      comments: comments,
    },
  };
};

const PostDetail: FC<{ post: IPostRead; comments: IPostCommentRead }> = ({
  post,
  comments,
}) => {
  //state

  return (
    <main>
      <PostDetailSlider images={post?.images || []} />

      <PostDetailDescription />
      <div className="w-full my-5">
        <AllCommentTabs comments={comments} />
      </div>
    </main>
  );
};

export default memo(PostDetail);
