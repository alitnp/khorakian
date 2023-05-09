import {
	ApiDataResponse,
	IExperienceRead,
} from "@my/types";
import { FC, memo } from "react";
import ContentDetailSlider from "@/components/global/Slider/ContentDetailSlider";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import RichTextRenderer from "@/components/global/RichText/RichTextRenderer";
import { parseStringArticle } from "@/components/global/RichText/richTextRendererFunctions";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";

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
	console.log(experience);

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
		</main>
	);
};

export default memo(ExperienceDetail);
