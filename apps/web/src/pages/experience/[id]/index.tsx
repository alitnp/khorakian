import {
	ApiDataResponse,
	IExperienceRead,
} from "@my/types";
import { FC, memo, useState } from "react";
import ContentDetailSlider from "@/components/global/Slider/ContentDetailSlider";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import RichTextRenderer from "@/components/global/RichText/RichTextRenderer";
import { parseStringArticle } from "@/components/global/RichText/richTextRendererFunctions";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { webApiCatch } from "@/global/utils/webApiThen";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const experience = await serverSideFetch<
			ApiDataResponse<IExperienceRead>
		>(
			webEndpointUrls.getExperienceDetail(
				context?.params?.id as string
			),
			context.req
		);
		// const comments = await serverSideFetch<
		// 	ApiListDataResponse<IPostCommentRead>
		// >(
		// 	webEndpointUrls.getPostDetail(
		// 		(context?.params?.id as string) + "?pageSize=50&postId="
		// 	),
		// 	context.req
		// );

		return {
			props: {
				experience: experience.data,
				// comments: comments
			},
		};
	};

const ExperienceDetail: FC<{
	experience: IExperienceRead;
}> = ({ experience }) => {
	const [, setFakeNumber] = useState<number>(1);
	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.experienceLike + "/" + experience._id
		)
			.then((res: any) => {
				experience.liked = res.data.liked;
				experience.likeCount = res.data.likeCount;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<main>
			<ContentDetailSlider images={experience?.images || []} />
			<div className="max-w-2xl mx-auto">
				<div className="mb-4">
					<div className="flex flex-col justify-between gap-2 pb-2 mb-2 text-sm border-b sm:flex-row text-k-grey-text-color">
						<span>
							تجربیات
							{"  >  "}
							{experience?.experienceCategory?.title}
							{"  >  "}
							{experience.title}
						</span>
						<span>
							{dateObjectFormatter(experience?.creationDate)}
						</span>
					</div>
					<div className="flex justify-end">
						<CardLikeCommentCount
							viewCount={experience.viewCount || 0}
							likeCount={experience.likeCount || 0}
							commentCount={experience.commentCount || 0}
							isLiked={experience.liked}
							withText
							handleLike={handleLike}
						/>
					</div>
				</div>
				<RichTextRenderer
					data={parseStringArticle(experience?.article)}
				/>
				{/* <PostDetailDescription />
				<div className="w-full my-5">
					<AllCommentTabs />
				</div> */}
			</div>
			{/* comments part  */}
			<div className="w-full max-w-2xl mx-auto mb-4">
				<AllCommentTabs
					endPointUrlGetAllComments={
						webEndpointUrls.experienceCommentsGetAll
					}
					endPointUrlGetAllAdminComments={
						webEndpointUrls.experienceAdminCommentsGetAll
					}
					endPointUrlGetAllMyComments={
						webEndpointUrls.experienceMyCommentsGetAll
					}
					commentCreateUrl={
						webEndpointUrls.experienceCommentCreate
					}
					commentReplyUrl={
						webEndpointUrls.experienceCommnetReply
					}
					parentId={experience?._id}
				/>
			</div>
		</main>
	);
};

export default memo(ExperienceDetail);
