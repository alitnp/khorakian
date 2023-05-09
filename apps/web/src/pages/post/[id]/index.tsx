import { ApiDataResponse, IPostCommentRead, IPostRead } from '@my/types';
import { FC, memo } from 'react';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
import AllCommentTabs from '@/components/post/postDetail/comments/AllCommentTabs';
import PostDetailDescription from '@/components/post/postDetail/PostDetailDescription';
import { GetServerSideProps } from 'next';
import { serverSideFetch } from '@/global/utils/webFetch';
import ContentDetailSlider from '@/components/global/Slider/ContentDetailSlider';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await serverSideFetch<ApiDataResponse<IPostRead>>(
    webEndpointUrls.getPostDetail(context?.params?.id as string),
    context.req
  );

  const comments = await serverSideFetch<ApiDataResponse<IPostCommentRead>>(
    webEndpointUrls.getAllPostComments +
      '?pageSize=50&content=' +
      context?.params?.id,
    context.req
  );

  return {
    props: {
      post: post.data,
      comments: comments.data,
    },
  };
};

const PostDetail: FC<{ post: IPostRead; comments: IPostCommentRead }> = ({
  post,
  comments,
}) => {
  //state

  console.log(comments);

  return (
    <main>
      <ContentDetailSlider images={post?.images || []} />

      <PostDetailDescription />
      <div className="w-full my-5">
        <AllCommentTabs comments={comments} />
      </div>
    </main>
  );
};

export default memo(PostDetail);
