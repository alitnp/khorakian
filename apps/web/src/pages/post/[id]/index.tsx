import { ApiDataResponse, IPostRead } from "@my/types";
import { FC, memo } from "react";
import PostDetailSlider from "@/components/post/postDetail/PostDetailSlider";
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
				(context?.params?.id as string) || "asdf"
			),
			context.req
		);

		return { props: { post: post.data } };
	};

const PostDetail: FC<{ post: IPostRead }> = ({ post }) => {
	//state

	return (
		<main>
			<PostDetailSlider images={post?.images || []} />

			<PostDetailDescription />
			<div className="w-full my-5">
				<AllCommentTabs />
			</div>
		</main>
	);
};

export default memo(PostDetail);
