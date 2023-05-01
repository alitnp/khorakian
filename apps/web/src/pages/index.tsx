import { GetStaticProps } from "next";
import { serverSideFetch } from "@/global/utils/webFetch";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataResponse,
	IPageItemConents,
} from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo } from "react";
import HomeSlider from "@/components/home/HomeSlider";
import HomeCards from "@/components/home/components/HomeCards";
import TimeLine from "@/components/global/TimeLine/TimeLine";
import HomeWideCards from "@/components/home/components/HomeWideCards";
import HomeTextOnlyCards from "@/components/home/components/HomeTextOnlyCards ";
import HomeImageOnlyCards from "@/components/home/components/HomeImageOnlyCards";

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
	return (
		<main>
			{pageItems.map((pageItem, index) => {
				if (pageItem.type.title === "slider")
					return (
						<HomeSlider key={pageItem._id} data={pageItem} />
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
			})}
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
