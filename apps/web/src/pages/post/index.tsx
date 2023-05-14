import {
	getAllPostCategories,
	getAllPosts,
} from "@/components/post/postFunctions";
import webRoutes from "@/global/constants/routes";
import { IPostCategory, IPostRead } from "@my/types";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FC, useMemo } from "react";
import querystring from "querystring";
import PostsFloatingBox from "@/components/post/posts/PostsFloatingBox";

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
		const posts = await getAllPosts(context.req);

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
	console.log(querystring.stringify(query));
	//constants

	return (
		<div>
			<PostsFloatingBox
				query={query}
				postCategories={postCategories}
			/>
			<div className="h-[200vh]"></div>
		</div>
	);
};

export default PostsPage;
