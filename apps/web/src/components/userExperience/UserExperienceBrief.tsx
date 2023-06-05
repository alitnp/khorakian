import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import {
	ApiDataResponse,
	IUserExperienceRead,
} from "@my/types";
import { FC, memo, useState } from "react";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";
import { BiArrowBack } from "react-icons/bi";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import UserImageAndName from "@/components/post/postDetail/comments/UserImageAndName";

interface IExperienceBrief {
	experience: IUserExperienceRead;
}

const UserExperienceBrief: FC<IExperienceBrief> = ({
	experience,
}) => {
	const [, setFakeNumber] = useState<number>(1);

	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.userExperienceLike + "/" + experience._id
		)
			.then((res: ApiDataResponse<IUserExperienceRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IUserExperienceRead>,
					IUserExperienceRead
				>({
					res,
					notifFail: true,
					notifSuccess: false,
					onSuccessData: (data) => {
						experience.liked = data.liked;
						experience.likeCount = data.likeCount;
						setFakeNumber((prevState) => ++prevState);
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<article className="p-4 my-2 rounded-xl bg-k-grey-bg-1-color">
			<div className="flex items-start justify-between gap-x-4">
				<div className="flex flex-col gap-4 mb-2 sm:flex-row">
					<div>
						<UserImageAndName
							user={experience.user}
							creationDate={experience.creationDate}
						/>
					</div>
				</div>
				<Link
					href={
						webRoutes.userExperienceDetail.path +
						"/" +
						experience._id
					}
					className="items-center hidden gap-2 text-sm font-medium cursor-pointer text-k-primary-color hover:text-k-primary-2-color md:flex"
				>
					<span>بیشتر بخوانید</span>
					<BiArrowBack className="text-xl" />
				</Link>
			</div>
			<div className="flex items-start justify-between gap-x-4">
				<div className="flex flex-col gap-4 mb-5 sm:flex-row">
					<div>
						<Link
							href={
								webRoutes.userExperienceDetail.path +
								"/" +
								experience._id
							}
							className="hover:text-k-primary-color"
						>
							<h5 className="mb-2 text-lg font-bold ">
								{experience.title}
							</h5>
						</Link>
					</div>
				</div>
				<CardLikeCommentCount
					commentCount={experience.commentCount}
					likeCount={experience.likeCount}
					viewCount={experience.viewCount}
					handleLike={handleLike}
					isLiked={experience.liked}
					isCommented={false}
					detailPath={
						webRoutes.userExperienceDetail.path +
						"/" +
						experience._id
					}
				/>
			</div>
			<p>
				{experience.text}{" "}
				<Link
					href={
						webRoutes.userExperienceDetail.path +
						"/" +
						experience._id
					}
					className="text-k-secondary-color"
				>
					ادامه مطلب
				</Link>
			</p>
		</article>
	);
};

export default memo(UserExperienceBrief);
