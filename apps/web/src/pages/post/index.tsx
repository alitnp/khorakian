import {
	getAllPostCategories,
	getAllPosts,
} from "@/components/post/postFunctions";
import { IPostCategory, IPostRead } from "@my/types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC, useMemo } from "react";
import querystring from "querystring";
import PostsFloatingBox from "@/components/post/posts/PostsFloatingBox";
import Card from "@/components/global/Card/Card";
import {
	dateObjectFormatter,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import webRoutes from "@/global/constants/routes";

interface IPostsPage {
	postCategories: IPostCategory[];
	posts: IPostRead[];
	query: ParsedUrlQuery;
}

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const postCategories = await getAllPostCategories(
			context.req
		);
		const posts = await getAllPosts(
			context.req,
			context.query
		);

		if (!postCategories || !posts)
			return {
				redirect: { destination: "/500", permanent: false },
			};

		const props: IPostsPage = {
			postCategories,
			posts,
			query: context.query,
		};

		return { props };
	};

const PostsPage: FC<IPostsPage> = ({
	postCategories,
	posts,
	query,
}) => {
	return (
		<div>
			<PostsFloatingBox
				query={query}
				postCategories={postCategories}
			/>
			<div className="h-[200vh] mt-24 k-container gap-4">
				<div className="grid w-full gap-4 md:grid-cols-2">
					{posts.map((post) => {
						const image = getThumbnailFromContent(post);
						return (
							<Card
								key={post._id}
								category={post.postCategory.title}
								commentCount={post.commentCount}
								likeCount={post.likeCount}
								title={post.title}
								viewCount={post.viewCount}
								creationDate={dateObjectFormatter(
									post.creationDate
								)}
								isLiked={post.liked || false}
								height={image.height}
								width={image.width}
								imageAlt={image.imageAlt}
								imagePathname={image.imagePathname}
								isCommented={false}
								isVideo={image.isVideo}
								detailPath={
									webRoutes.postDetail.path + "/" + post._id
								}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PostsPage;
