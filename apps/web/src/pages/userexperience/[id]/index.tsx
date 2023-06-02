import {
	ApiDataResponse,
	IPostCommentRead,
	IUserExperienceRead,
} from "@my/types";
import { FC, memo, useState } from "react";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { GetServerSideProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import UserExperienceDetailDescription from "@/components/userExperience/UserExperienceDetailDescription";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { webApiCatch } from "@/global/utils/webApiThen";
import Image from "next/image";
import webConfig from "@/global/constants/webConfig";
import { VscAccount } from "react-icons/vsc";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const item = await serverSideFetch<
			ApiDataResponse<IUserExperienceRead>
		>(
			webEndpointUrls.userExperienceDetail(
				context?.params?.id as string
			),
			context.req
		);
		return {
			props: {
				item: item.data,
			},
		};
	};

const IdeaDetail: FC<{
	item: IUserExperienceRead;
	adminComments: IPostCommentRead[];
}> = ({ item }) => {
	const [, setFakeNumber] = useState<number>(1);
	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.userExperienceLike + "/" + item._id
		)
			.then((res: any) => {
				item.liked = res.data.liked;
				item.likeCount = res.data.likeCount;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<main>
			<div className="max-w-screen-lg mx-auto my-4 ">
				<div className="flex flex-col justify-between gap-2 pb-2 mb-2 text-sm border-b sm:flex-row text-k-grey-text-color">
					<span>
						تجربه کاربر
						{"  >  "}
						{item?.experienceCategory?.title}
						{"  >  "}
						{item.title}
					</span>
					<span>{dateObjectFormatter(item?.creationDate)}</span>
				</div>
				<div className="flex justify-between">
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
			</div>
			<UserExperienceDetailDescription userExperience={item} />
			{/* <div className="w-full my-5">
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
					parentId={userExperience?._id}
				/>
			</div> */}
		</main>
	);
};

export default memo(IdeaDetail);
