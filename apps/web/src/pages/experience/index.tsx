import { GetStaticProps } from "next";
import {
	ApiDataListResponse,
	IExperienceWithComments,
	IImage,
} from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo } from "react";
import MainTitle from "@/components/experience/MainTitle";
import ExperienceTips from "@/components/experience/ExperienceTips";
import {
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import {
	getExperienceListWithComments,
	getUserExperienceCount,
} from "@/components/experience/experienceFunctions";
import ExperienceBrief from "@/components/experience/ExperienceBrief";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
	experience: ApiDataListResponse<IExperienceWithComments>;
	userExperienceCount: number;
};

export const getStaticProps: GetStaticProps = async () => {
	const defaultTextsObject = await getHomeDefaultTexts();
	const defaultImagesObject = await getHomeDefaultImages();
	const experience = await getExperienceListWithComments();
	const userExperienceCount = await getUserExperienceCount();

	const props: props = {
		defaultImagesObject,
		defaultTextsObject,
		experience,
		userExperienceCount,
	};

	return {
		props,
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Experience = ({
	defaultImagesObject,
	defaultTextsObject,
	experience,
	userExperienceCount,
}: props) => {
	return (
		<main>
			<MainTitle
				{...defaultTextsObject}
				{...defaultImagesObject}
			/>
			<ExperienceTips
				{...defaultTextsObject}
				{...defaultImagesObject}
			/>
			<div
				className="flex flex-col max-w-5xl gap-4 mx-auto mt-6 md:flex-row k-container"
			>
				{userExperienceCount > 0 && (
					<div className="flex flex-col justify-between p-4 border rounded-lg">
						<h5 className="font-medium">تجربیات کاربران</h5>
						<span className="text-sm text-k-grey-text-color">
							تا کنون {userExperienceCount} تجربه توسط کاربران
							سامانه ثبت شده و مورد بحث و گفتگو قرار گرفته.
						</span>
						<Link
							href={webRoutes.userExperienceList.path}
							className="mt-2 text-sm text-k-primary-color"
						>
							نمایش همه تجربیات کاربران
						</Link>
					</div>
				)}
				<div className="flex flex-col justify-between p-4 border rounded-lg">
					<h5 className="font-medium">تجربیات امیر خوراکیان</h5>
					<span className="text-sm text-k-grey-text-color">
						تا کنون {experience.totalItems} تجربه توسط امیر
						خوراکیان سامانه ثبت شده و مورد بحث و گفتگو قرار گرفته.
					</span>
					<Link
						href={webRoutes.experienceAllContent.path}
						className="mt-2 text-sm text-k-primary-color"
					>
						نمایش همه تجربیات امیر خوراکیان
					</Link>
				</div>
			</div>
			<div className="max-w-5xl mx-auto k-container">
				<div className="flex justify-between pb-6 mt-10 border-b border-k-border-2-color">
					<h1 className="text-base font-medium">
						آخرین تجربیات ثبت شده توسط امیر خوراکیان
					</h1>
				</div>
				{experience.data.map((item) => (
					<ExperienceBrief key={item._id} experience={item} />
				))}
			</div>
		</main>
	);
};

export default memo(Experience);
