import {
	ApiDataResponse,
	IIdeaRead,
	IImage,
	IPostCommentRead,
	ISocialMediaRead,
} from "@my/types";
import { FC, memo, useState } from "react";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import IdeaDetailDescription from "@/components/idea/IdeaDetailDescription";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import webConfig from "@/global/constants/webConfig";
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

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const item = await serverSideFetch<
			ApiDataResponse<IIdeaRead>
		>(
			webEndpointUrls.ideaDetail(
				context?.params?.id as string
			),
			context.req
		);
		const socialMedias = await getAllSocialMedias();
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();

		return {
			props: {
				item: item.data,
				socialMedias,
				defaultImages: defaultImagesObject,
				defaultTexts: defaultTextsObject,
			},
		};
	};

const IdeaDetail: FC<{
	item: IIdeaRead;
	adminComments: IPostCommentRead[];
	socialMedias: ISocialMediaRead[];
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
}> = ({
	item,
	defaultImages,
	defaultTexts,
	socialMedias,
}) => {
	const [, setFakeNumber] = useState<number>(1);
	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.ideaLike + "/" + item._id
		)
			.then((res: any) => {
				item.liked = res.data.liked;
				item.likeCount = res.data.likeCount;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<>
			<main>
				<div className="max-w-5xl mx-auto my-4 k-container">
					<div className="flex flex-col justify-between gap-2 pb-2 mb-2 text-sm border-b sm:flex-row text-k-grey-text-color">
						<span>
							ایده
							{"  >  "}
							{item?.ideaCategory?.title}
							{"  >  "}
							{item.title}
						</span>
						<span>{dateObjectFormatter(item?.creationDate)}</span>
					</div>
					<div className="flex flex-col justify-between gap-2 sm:flex-row">
						<div>
							{item.user && (
								<div className="flex items-center gap-1">
									{item.user.image?.thumbnailPathname ? (
										<Image
											src={
												webConfig.domain +
												item.user.image.thumbnailPathname
											}
											width={64}
											height={64}
											alt={item.user.fullName}
											className="object-cover w-12 h-12 rounded-full"
										/>
									) : (
										<VscAccount />
									)}
									<span>{item.user.fullName}</span>
								</div>
							)}
						</div>
						<CardLikeCommentCount
							viewCount={item.viewCount || 0}
							likeCount={item.likeCount || 0}
							commentCount={item.commentCount || 0}
							isLiked={item.liked}
							withText
							handleLike={handleLike}
						/>
					</div>
					<IdeaDetailDescription idea={item} />
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
							parentId={item?._id}
							commentReplyUrl={
								webEndpointUrls.experienceCommnetReply
							}
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

export default memo(IdeaDetail);
