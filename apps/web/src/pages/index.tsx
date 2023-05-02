import { GetStaticProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataListResponse,
	ApiDataResponse,
	IDefaultText,
	IPageItemConents,
} from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo, useMemo } from "react";
import HomeSlider from "@/components/home/HomeSlider";
import HomeCards from "@/components/home/HomeCards";
import TimeLine from "@/components/global/TimeLine/TimeLine";
import HomeWideCards from "@/components/home/HomeWideCards";
import HomeTextOnlyCards from "@/components/home/HomeTextOnlyCards ";
import HomeImageOnlyCards from "@/components/home/HomeImageOnlyCards";
import HomeIdeaExpLink from "@/components/home/HomeIdeaExpLink";
import HomeAboutMe from "@/components/home/HomeAboutMe";

export const getStaticProps: GetStaticProps = async () => {
	const pageItems: ApiDataResponse<IPageItemConents> =
		await serverSideFetch(
			webEndpointUrls.pageItemWithContent
		);
	if (!pageItems) {
		console.log(
			"error fetch : " + webEndpointUrls.pageItemWithContent
		);
	}
	const defaultTexts: ApiDataListResponse<IDefaultText> =
		await serverSideFetch(
			webEndpointUrls.defautlTextGetAll + "?pageSize=200"
		);
	if (!pageItems) {
		console.log(
			"error fetch : " + webEndpointUrls.pageItemWithContent
		);
	}
	const defaultTextsObject: Record<string, string> = {};
	defaultTexts.data.map((item) => {
		defaultTextsObject[item.key] = item.text;
	});

	return {
		props: {
			pageItems: pageItems.data,
			defaultTexts: defaultTextsObject,
		},

		revalidate: webConfig.dataRevalidateTime,
	};
};

const Home = ({
	pageItems,
	defaultTexts,
}: {
	pageItems: IPageItemConents[];
	defaultTexts: Record<string, string>;
}) => {
	const renderPageItems = useMemo(
		() =>
			pageItems.map((pageItem, index) => {
				if (pageItem.type.title === "slider")
					return (
						<HomeSlider key={pageItem._id} data={pageItem} />
					);
				if (pageItem.type.title === "timeLine")
					return <TimeLine key={pageItem._id} />;
				if (pageItem.type.title === "homeIdeaExperienceBox")
					return <HomeIdeaExpLink {...defaultTexts} />;
				if (pageItem.type.title === "aboutMe")
					return <HomeAboutMe {...defaultTexts} />;
				if (pageItem.style.title === "default")
					return (
						<HomeCards
							greyBg={index % 2 === 0}
							key={pageItem._id}
							data={pageItem}
						/>
					);
				if (pageItem.style.title === "wide")
					return (
						<HomeWideCards
							greyBg={index % 2 === 0}
							key={pageItem._id}
							data={pageItem}
						/>
					);
				if (pageItem.style.title === "textOnly")
					return (
						<HomeTextOnlyCards
							greyBg={index % 2 === 0}
							key={pageItem._id}
							data={pageItem}
						/>
					);
				if (pageItem.style.title === "imageOnly")
					return (
						<HomeImageOnlyCards
							greyBg={index % 2 === 0}
							key={pageItem._id}
							data={pageItem}
						/>
					);
			}),
		[]
	);
	return <main>{renderPageItems}</main>;
};

export default memo(Home);
