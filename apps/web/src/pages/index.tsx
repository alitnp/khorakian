import { GetServerSideProps } from "next";
import {
	IAboutMeRead,
	IHistory,
	IIdeaRead,
	IImage,
	IPageItemConents,
	IPostRead,
	ISocialMediaRead,
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
	getAllHistories,
	getAllSocialMedias,
	getFeaturedIdeas,
	getHomeAboutMePosts,
	getHomeDefaultImages,
	getHomeDefaultTexts,
	getHomePageItems,
	getTimelinePosts,
} from "@/components/home/homeFunctions";
import Footer from "@/components/global/Footer/Footer";
import HomeFeatured from "@/components/home/HomeFeatured";

type homeProps = {
	pageItems: IPageItemConents[];
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
	aboutMePosts: IAboutMeRead[];
	socialMedias: ISocialMediaRead[];
	histories: IHistory[];
	timeLinePosts: IPostRead[];
	// featuredIdeas: IIdeaRead[];
};

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const pageItems = await getHomePageItems(context.req);
		const defaultTextsObject = await getHomeDefaultTexts(
			context.req
		);
		const defaultImagesObject = await getHomeDefaultImages(
			context.req
		);
		const aboutMePosts = await getHomeAboutMePosts(
			context.req
		);
		const socialMedias = await getAllSocialMedias(
			context.req
		);
		const histories = await getAllHistories(context.req);
		const timeLinePosts = await getTimelinePosts(context.req);
		// const featuredIdeas = await getFeaturedIdeas(context.req);

		const props: homeProps = {
			pageItems: pageItems.data,
			defaultTexts: defaultTextsObject,
			defaultImages: defaultImagesObject,
			aboutMePosts,
			socialMedias,
			histories,
			timeLinePosts,
			// featuredIdeas,
		};

		return {
			props,
			// revalidate: webConfig.dataRevalidateTime,
		};
	};

const Home = ({
	pageItems,
	defaultTexts,
	defaultImages,
	aboutMePosts,
	socialMedias,
	histories,
	timeLinePosts,
}: // featuredIdeas,
homeProps) => {
	const renderPageItems = useMemo(
		() =>
			pageItems.map((pageItem, index) => {
				if (pageItem.type.title === "slider")
					return (
						<HomeSlider
							key={pageItem._id}
							data={pageItem}
							histories={histories}
						/>
					);
				if (pageItem.type.title === "timeLine")
					return (
						<TimeLine
							key={pageItem._id}
							posts={timeLinePosts}
							title={pageItem.title}
							subTitle={pageItem.subTitle}
						/>
					);
				if (pageItem.type.title === "homeIdeaExperienceBox")
					return (
						<HomeIdeaExpLink
							key={pageItem._id}
							// featuredIdeas={featuredIdeas}
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
							greyBg={index % 2 === 0}
							{...defaultTexts}
							posts={aboutMePosts}
							home_aboutMe_image={
								defaultImages?.home_aboutMe_image
							}
						/>
					);
				if (pageItem.type.title === "featured")
					return (
						<HomeFeatured
							key={pageItem._id}
							title={pageItem.title}
							posts={pageItem.content.slice(0, 6)}
							greyBg={index % 2 === 0}
						/>
					);
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
	return (
		<>
			<main>{renderPageItems}</main>
			<Footer
				{...defaultTexts}
				footer_image={defaultImages.footer_image}
				socialMedias={socialMedias}
			/>
		</>
	);
};

export default memo(Home);
