import { GetStaticProps } from "next";
import { IImage } from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo } from "react";
import MainTitle from "@/components/experience/MainTitle";
import ExperienceTips from "@/components/experience/ExperienceTips";
import {
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
};

export const getStaticProps: GetStaticProps = async () => {
	const defaultTextsObject = await getHomeDefaultTexts();
	const defaultImagesObject = await getHomeDefaultImages();

	const props: props = {
		defaultImagesObject,
		defaultTextsObject,
	};

	return {
		props,
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Experience = ({
	defaultImagesObject,
	defaultTextsObject,
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
		</main>
	);
};

export default memo(Experience);
