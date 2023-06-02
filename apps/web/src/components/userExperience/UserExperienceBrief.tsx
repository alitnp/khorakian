import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IUserExperienceRead } from "@my/types";
import { FC, memo } from "react";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";
import { BiArrowBack } from "react-icons/bi";

interface IExperienceBrief {
	experience: IUserExperienceRead;
}

const UserExperienceBrief: FC<IExperienceBrief> = ({
	experience,
}) => {
	return (
		<article className="py-10 border-b border-k-border-2-color">
			<div className="flex items-start justify-between gap-x-4">
				<div className="flex flex-col gap-4 mb-5 sm:flex-row">
					<div>
						<span className="text-xs text-k-grey-text-color">
							{dateObjectFormatter(
								experience.creationDate,
								"DD MMMM YYYY"
							)}
						</span>
						<Link
							href={
								webRoutes.userExperienceDetail.path +
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
			<p>
				{experience.text}
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
