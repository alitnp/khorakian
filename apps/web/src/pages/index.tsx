import { GetStaticProps } from "next";
import {
	IImage,
	IPageItemConents,
	IPostRead,
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
import {
	getHomeAboutMePosts,
	getHomeDefaultImages,
	getHomeDefaultTexts,
	getHomePageItems,
} from "@/components/home/homeFunctions";

type homeProps = {
	pageItems: IPageItemConents[];
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
	aboutMePosts: IPostRead[];
};

export const getStaticProps: GetStaticProps = async () => {
	const pageItems = await getHomePageItems();
	const defaultTextsObject = await getHomeDefaultTexts();
	const defaultImagesObject = await getHomeDefaultImages();
	const aboutMePosts = await getHomeAboutMePosts();

	const props: homeProps = {
		pageItems: pageItems.data,
		defaultTexts: defaultTextsObject,
		defaultImages: defaultImagesObject,
		aboutMePosts,
	};

	return {
		props,
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Home = ({
	pageItems,
	defaultTexts,
	defaultImages,
	aboutMePosts,
}: homeProps) => {
	console.log("asldfkjhasldfkj");
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
					return (
						<HomeIdeaExpLink
							key={pageItem._id}
							{...defaultTexts}
							home_experience_image={
								defaultImages?.home_experience_image
							}
							home_idea_image={defaultImages?.home_idea_image}
						/>
					);
				if (pageItem.type.title === "aboutMe")
					return (
						<HomeAboutMe
							key={pageItem._id}
							{...defaultTexts}
							posts={aboutMePosts}
							home_aboutMe_image={
								defaultImages?.home_aboutMe_image
							}
						/>
					);
				if (pageItem.type.title === "timeLine")
					return <TimeLine key={pageItem._id} />;
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
