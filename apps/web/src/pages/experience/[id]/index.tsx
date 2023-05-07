import {
	ApiDataResponse,
	IExperienceRead,
} from "@my/types";
import { FC, memo } from "react";
import PostDetailSlider from "@/components/post/postDetail/PostDetailSlider";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import PostDetailDescription from "@/components/post/postDetail/PostDetailDescription";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import RichTextRenderer from "@/components/global/RichText/RichTextRenderer";
import { parseStringArticle } from "@/components/global/RichText/richTextRendererFunctions";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const post = await serverSideFetch<
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
				post: post.data,
				// comments: comments
			},
		};
	};

const PostDetail: FC<{ post: IExperienceRead }> = ({
	post,
}) => {
	//state

	return (
		<main>
			<PostDetailSlider images={post?.images || []} />
			<RichTextRenderer
				data={parseStringArticle(post?.article)}
			/>
			{/* <PostDetailDescription />
			<div className="w-full my-5">
				<AllCommentTabs />
			</div> */}
		</main>
	);
};

export default memo(PostDetail);
