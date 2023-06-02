import { ApiDataResponse, IIdeaRead, IPostCommentRead } from '@my/types';
import { FC, memo } from 'react';
import webEndpointUrls from '@/global/constants/webEndpointUrls';
// import AllCommentTabs from '@/components/post/postDetail/comments/AllCommentTabs';
import { GetServerSideProps } from 'next';
import { serverSideFetch } from '@/global/utils/webFetch';
import IdeaDetailDescription from '@/components/idea/IdeaDetailDescription';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const item = await serverSideFetch<ApiDataResponse<IIdeaRead>>(
    webEndpointUrls.ideaDetail(context?.params?.id as string),
    context.req
  );
  return {
    props: {
      idea: item.data,
    },
  };
};

const IdeaDetail: FC<{
  idea: IIdeaRead;
  adminComments: IPostCommentRead[];
}> = ({ idea }) => {
  return (
    <main>
      <IdeaDetailDescription idea={idea} />
      <div className="w-full my-5">
        {/* <AllCommentTabs
					endPointUrlGetAllComments={
						webEndpointUrls.getAllPostComments
					}
					endPointUrlGetAllAdminComments={
						webEndpointUrls.getAllPostAdminComments
					}
					endPointUrlGetAllMyComments={
						webEndpointUrls.getAllMyComments
					}
					commentCreateUrl={webEndpointUrls.postCommentCreate}
					parentId={idea?._id}
				/> */}
      </div>
    </main>
  );
};

export default memo(IdeaDetail);
