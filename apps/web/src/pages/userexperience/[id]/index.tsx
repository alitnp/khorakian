import {
	ApiDataResponse,
	IIdeaRead,
	IPostCommentRead,
	IUserExperienceRead,
} from "@my/types";
import { FC, memo } from "react";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import UserExperienceDetailDescription from "@/components/userExperience/UserExperienceDetailDescription";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const item = await serverSideFetch<
			ApiDataResponse<IUserExperienceRead>
		>(
			webEndpointUrls.userExperienceDetail(
				context?.params?.id as string
			),
			context.req
		);
		return {
			props: {
				userExperience: item.data,
			},
		};
	};

const IdeaDetail: FC<{
	userExperience: IUserExperienceRead;
	adminComments: IPostCommentRead[];
}> = ({ userExperience }) => {
	return (
		<main>
			<UserExperienceDetailDescription
				userExperience={userExperience}
			/>
			{/* <div className="w-full my-5">
				<AllCommentTabs
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
					parentId={userExperience?._id}
				/>
			</div> */}
		</main>
	);
};

export default memo(IdeaDetail);
