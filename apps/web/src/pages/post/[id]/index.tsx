import { ApiDataResponse, IPostRead } from "@my/types";
import { FC, memo } from "react";
import ContentDetailSlider from "@/components/global/Slider/ContentDetailSlider";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import PostDetailDescription from "@/components/post/postDetail/PostDetailDescription";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const post = await serverSideFetch<
			ApiDataResponse<IPostRead>
		>(
			webEndpointUrls.getPostDetail(
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

const PostDetail: FC<{ post: IPostRead }> = ({ post }) => {
	//state

	return (
		<main>
			<ContentDetailSlider images={post?.images || []} />

			<PostDetailDescription />
			<div className="w-full my-5">
				<AllCommentTabs />
			</div>
		</main>
	);
};

export default memo(PostDetail);
