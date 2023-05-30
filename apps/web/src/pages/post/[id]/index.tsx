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
  return {
    props: {
      post: post.data,
    },
  };
};

const PostDetail: FC<{
  post: IPostRead;
  adminComments: IPostCommentRead[];
}> = ({ post }) => {
  return (
    <main>
      <ContentDetailSlider images={post?.images || []} />
      <PostDetailDescription post={post} />
      <div className="w-full my-5">
        <AllCommentTabs
          endPointUrlGetAllComments={webEndpointUrls.getAllPostComments}
          endPointUrlGetAllAdminComments={
            webEndpointUrls.getAllPostAdminComments
          }
          endPointUrlGetAllMyComments={webEndpointUrls.getAllMyComments}
          commentCreateUrl={webEndpointUrls.postCommentCreate}
          parentId={post?._id}
        />
      </div>
    </main>
  );
};

export default memo(PostDetail);
