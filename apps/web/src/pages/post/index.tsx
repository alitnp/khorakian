import {
	getAllPostCategories,
	getAllPosts,
} from "@/components/post/postFunctions";
import {
	ApiDataListResponse,
	IImage,
	IPostCategory,
	IPostRead,
	ISocialMediaRead,
} from "@my/types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC, useCallback } from "react";
import {
	dateObjectFormatter,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import webRoutes from "@/global/constants/webRoutes";
import FreeHeightCard from "@/components/home/FreeHeightCard";
import { Pagination } from "antd";
import Footer from "@/components/global/Footer/Footer";
import {
	getAllSocialMedias,
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import { useRouter } from "next/router";
import queryString from "querystring";
import AllItemsPageFloatingBox from "@/components/global/AllItemsPageFloatingBox/AllItemsPageFloatingBox";
import MyMasonry from "@/components/global/Masonry/MyMasonry";

interface IPostsPage {
	postCategories: IPostCategory[];
	posts: ApiDataListResponse<IPostRead>;
	query: ParsedUrlQuery;
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
	socialMedias: ISocialMediaRead[];
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
		const socialMedias = await getAllSocialMedias();
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();

		if (!postCategories || !posts)
			return {
				redirect: { destination: "/500", permanent: false },
			};

		const props: IPostsPage = {
			postCategories,
			posts,
			socialMedias,
			defaultImages: defaultImagesObject,
			defaultTexts: defaultTextsObject,
			query: context.query,
		};

		return { props };
	};

const PostsPage: FC<IPostsPage> = ({
	postCategories,
	posts,
	query,
	socialMedias,
	defaultImages,
	defaultTexts,
}) => {
	//hooks
	const { push } = useRouter();

	//functins
	const handlePagination = useCallback(
		(pageNumber: number) => {
			push(
				webRoutes.postAllContents.path +
					"?" +
					queryString.stringify({ ...query, pageNumber })
			);
		},
		[query]
	);

	return (
		<>
			<main>
				<AllItemsPageFloatingBox
					query={query}
					postCategories={postCategories}
					route={webRoutes.postAllContents.path}
				/>
				<div className="min-h-[70vh] pt-12 k-container">
					<MyMasonry>
						{posts.data.map((post) => {
							const image = getThumbnailFromContent(post);
							return (
								<FreeHeightCard
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
					</MyMasonry>
				</div>
				{posts.totalPages > 1 && (
					<div className="flex justify-center my-6">
						<Pagination
							current={posts.pageNumber}
							pageSize={posts.pageSize}
							total={posts.totalItems}
							onChange={handlePagination}
						/>
					</div>
				)}
			</main>
			<Footer
				{...defaultTexts}
				footer_image={defaultImages.footer_image}
				socialMedias={socialMedias}
			/>
		</>
	);
};

export default PostsPage;
