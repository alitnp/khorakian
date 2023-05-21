import webConfig from "@/global/constants/webConfig";
import {
	dateObjectFormatter,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { IExperienceWithComments } from "@my/types";
import Image from "next/image";
import { FC, useMemo, memo } from "react";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Link from "next/link";
import webRoutes from "@/global/constants/routes";
import { VscAccount } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";

interface IExperienceBrief {
	experience: IExperienceWithComments;
}

const ExperienceBrief: FC<IExperienceBrief> = ({
	experience,
}) => {
	const image = useMemo(
		() => getThumbnailFromContent(experience),
		[]
	);

	return (
		<article className="py-10 border-b border-k-border-2-color">
			<div className="flex items-start justify-between gap-x-4">
				<div className="flex flex-col gap-4 mb-5 sm:flex-row">
					{image && (
						<Link
							href={
								webRoutes.experienceDetail.path +
								"/" +
								experience._id
							}
						>
							<Image
								src={webConfig.domain + image.imagePathname}
								width={image.width}
								height={image.height}
								alt={image.imageAlt}
								className="sm:max-w-[150px] sm:max-h-[150px] rounded-lg w-full"
							/>
						</Link>
					)}
					<div>
						<span className="text-xs text-k-grey-text-color">
							{dateObjectFormatter(
								experience.creationDate,
								"DD MMMM YYYY"
							)}
						</span>
						<Link
							href={
								webRoutes.experienceDetail.path +
								"/" +
								experience._id
							}
							className="hover:text-k-primary-color"
						>
							<h5 className="pb-2 mb-2 text-lg font-bold border-b">
								{experience.title}
							</h5>
						</Link>
						<CardLikeCommentCount
							commentCount={experience.commentCount}
							likeCount={experience.likeCount}
							viewCount={experience.viewCount}
						/>
					</div>
				</div>
				<Link
					href={
						webRoutes.experienceDetail.path + "/" + experience._id
					}
					className="items-center hidden gap-2 text-sm font-medium cursor-pointer text-k-primary-color hover:text-k-primary-2-color md:flex"
				>
					<span>بیشتر بخوانید</span>
					<BiArrowBack className="text-xl" />
				</Link>
			</div>
			<p>
				{experience.text}
				<Link
					href={
						webRoutes.experienceDetail.path + "/" + experience._id
					}
					className="text-k-secondary-color"
				>
					ادامه مطلب
				</Link>
			</p>
			{experience.comments.length > 0 && (
				<div className="mt-6 ">
					<span className="block text-xs text-k-grey-text-color">
						پاسخ داده شده توسط :
					</span>
					<div className="flex gap-4 mt-2">
						{experience.comments.slice(0, 3).map((comment) => (
							<div
								key={comment._id}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-k-grey-bg-1-color"
							>
								{comment.user.image && webConfig.domain ? (
									<Image
										src={
											webConfig.domain +
											comment.user.image.thumbnailPathname
										}
										alt={comment.user.image.title}
										width={comment.user.image.thumbnailWidth}
										height={comment.user.image.thumbnailHeight}
										className="w-16 h-64 rounded-full"
									/>
								) : (
									<VscAccount />
								)}
								{comment.user.fullName}
							</div>
						))}
						{experience.commentCount > 3 && (
							<span>
								+ {experience.commentCount - 3} کاربر دیگر
							</span>
						)}
					</div>
				</div>
			)}
		</article>
	);
};

export default memo(ExperienceBrief);
