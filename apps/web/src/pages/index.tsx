import Card from "@/components/global/Card/Card";
import CardsRow from "@/components/global/PageItems/CardsRow";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import SliderHistory from "@/components/global/Slider/SliderHistory";
import SliderSlide from "@/components/global/Slider/SliderSlide";
import Slider from "@/components/global/Slider/Slider";
import WideCardsRow from "@/components/global/PageItems/WideCardsRow";
import WideCard from "@/components/global/Card/WideCard";
import ImageOnlyCardsRow from "@/components/global/PageItems/ImageOnlyCardsRow";
import ImageOnlyCard from "@/components/global/Card/ImageOnlyCard";
import TextOnlyCardsRow from "@/components/global/PageItems/TextOnlyCardsRow";
import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import TimeLine from "@/components/global/TimeLine/TimeLine";
import { GetStaticProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataResponse,
	IPageItemConents,
	ISliderRead,
} from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo, useCallback } from "react";
import webRoutes from "@/global/constants/routes";

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

	return {
		props: { pageItems: pageItems.data },
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Home = ({
	pageItems,
}: {
	pageItems: IPageItemConents[];
}) => {
	console.log(pageItems);

	return (
		<main>
			{pageItems.map((pageItem) => {
				if (pageItem.type.title === "slider")
					return (
						<Slider
							key={pageItem._id}
							history={<SliderHistory />}
							items={pageItem.content.map((slide: ISliderRead) => (
								<SliderSlide
									key={slide._id}
									{...slide}
									imagePathName={slide.image.pathname}
									width={slide.image.width}
									height={slide.image.height}
									imageAlt={slide.image.title}
								/>
							))}
						/>
					);
			})}
			{/* <CardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<Card key={index} />
					)
				)}
			/> */}
			{/* <WideCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<WideCard key={index} />
					)
				)}
			/> */}
			{/* <ImageOnlyCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<ImageOnlyCard key={index} />
					)
				)}
			/> */}
			{/* <TextOnlyCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<TextOnlyCard key={index} />
					)
				)}
			/> */}
			{/* <TimeLine /> */}
		</main>
	);
};

export default memo(Home);
