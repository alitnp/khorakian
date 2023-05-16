import { GetStaticProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataListResponse,
	ApiDataResponse,
	IDefaultText,
	IImage,
	IPageItemConents,
} from "@my/types";
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
			<ExperienceTips />
		</main>
	);
};

export default memo(Experience);
