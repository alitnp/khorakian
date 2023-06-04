import {
	ApiDataResponse,
	IImage,
	IPostCommentRead,
	IPostRead,
	ISocialMediaRead,
} from "@my/types";
import { FC, memo, useState } from "react";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import PostDetailDescription from "@/components/post/postDetail/PostDetailDescription";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import ContentDetailSlider from "@/components/global/Slider/ContentDetailSlider";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { webApiCatch } from "@/global/utils/webApiThen";
import Footer from "@/components/global/Footer/Footer";
import {
	getAllSocialMedias,
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import VideoPlayer from "@/components/global/VideoPlayer/VideoPlayer";
import webConfig from "@/global/constants/webConfig";
import VideoItem from "@/components/global/VideoPlayer/VideoItem";

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
		const socialMedias = await getAllSocialMedias();
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();

		return {
			props: {
				post: post.data,
				socialMedias,
				defaultImages: defaultImagesObject,
				defaultTexts: defaultTextsObject,
			},
		};
	};

const PostDetail: FC<{
	post: IPostRead;
	adminComments: IPostCommentRead[];
	socialMedias: ISocialMediaRead[];
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
}> = ({
	post,
	defaultImages,
	defaultTexts,
	socialMedias,
}) => {
	const [, setFakeNumber] = useState<number>(1);
	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.postLike + "/" + post._id
		)
			.then((res: any) => {
				post.liked = res.data.liked;
				post.likeCount = res.data.likeCount;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<>
			<main>
				<ContentDetailSlider
					images={post?.images || []}
					videos={post?.videos || []}
				/>
				<div className="max-w-screen-lg mx-auto mb-4 k-container">
					<div className="flex flex-col justify-between gap-2 pb-2 mb-2 text-sm border-b sm:flex-row text-k-grey-text-color">
						<span>
							مطلب
							{"  >  "}
							{post?.postCategory?.title}
							{"  >  "}
							{post.title}
						</span>
						<span>{dateObjectFormatter(post?.creationDate)}</span>
					</div>
					<div className="flex justify-end">
						<CardLikeCommentCount
							viewCount={post.viewCount || 0}
							likeCount={post.likeCount || 0}
							commentCount={post.commentCount || 0}
							isLiked={post.liked}
							withText
							handleLike={handleLike}
						/>
					</div>
					{/* {post.videos[0] && (
						<VideoItem video={post.videos[0]} size="full" />
					)} */}
					<PostDetailDescription post={post} />
					<div className="w-full my-5">
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
							parentId={post?._id}
							commentReplyUrl={webEndpointUrls.postCommnetReply}
						/>
					</div>
				</div>
			</main>
			<div className="max-w-5xl mx-auto">
				<Footer
					{...defaultTexts}
					footer_image={defaultImages?.footer_image}
					socialMedias={socialMedias}
				/>
			</div>
		</>
	);
};

export default memo(PostDetail);
