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
import { getExperienceListWithComments } from "@/components/experience/experienceFunctions";
import ExperienceBrief from "@/components/experience/ExperienceBrief";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
	experience: ApiDataListResponse<IExperienceWithComments>;
};

export const getStaticProps: GetStaticProps = async () => {
	const defaultTextsObject = await getHomeDefaultTexts();
	const defaultImagesObject = await getHomeDefaultImages();
	const experience = await getExperienceListWithComments();

	const props: props = {
		defaultImagesObject,
		defaultTextsObject,
		experience,
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
			<div className="mx-auto max-w-7xl k-container">
				<div className="flex justify-between pb-6 mt-10 border-b border-k-border-2-color">
					<h1 className="text-base font-medium">
						آخرین تجربیات ثبت شده
					</h1>
					<Link
						href={webRoutes.experienceAllContent.path}
						className="text-k-primary-color"
					>
						نمایش همه تجربیات
					</Link>
				</div>
				{experience.data.map((item) => (
					<ExperienceBrief key={item._id} experience={item} />
				))}
			</div>
		</main>
	);
};

export default memo(Experience);
