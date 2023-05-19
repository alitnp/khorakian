import {
	ApiDataListResponse,
	IExperienceCategory,
	IExperienceRead,
	IImage,
	ISocialMediaRead,
} from "@my/types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC, useCallback } from "react";
import {
	dateObjectFormatter,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import webRoutes from "@/global/constants/routes";
import FreeHeightCard from "@/components/home/FreeHeightCard";
import Masonry from "react-masonry-css";
import { Pagination } from "antd";
import Footer from "@/components/global/Footer/Footer";
import {
	getAllSocialMedias,
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import { useRouter } from "next/router";
import queryString from "querystring";
import {
	getAllExperienceCategories,
	getAllExperiences,
} from "@/components/experience/experienceFunctions";
import AllItemsPageFloatingBox from "@/components/global/AllItemsPageFloatingBox/AllItemsPageFloatingBox";

interface IAllExperiencePage {
	categories: IExperienceCategory[];
	items: ApiDataListResponse<IExperienceRead>;
	query: ParsedUrlQuery;
	defaultTexts: Record<string, string>;
	defaultImages: Record<string, IImage>;
	socialMedias: ISocialMediaRead[];
}

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const categories = await getAllExperienceCategories(
			context.req
		);
		const items = await getAllExperiences(
			context.req,
			context.query
		);
		const socialMedias = await getAllSocialMedias();
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();

		if (!categories || !items)
			return {
				redirect: { destination: "/500", permanent: false },
			};

		const props: IAllExperiencePage = {
			categories,
			items,
			socialMedias,
			defaultImages: defaultImagesObject,
			defaultTexts: defaultTextsObject,
			query: context.query,
		};

		return { props };
	};

const AllExperiencePage: FC<IAllExperiencePage> = ({
	categories,
	items,
	query,
	socialMedias,
	defaultImages,
	defaultTexts,
}) => {
	//hooks
	const { push } = useRouter();

	//functins
	const handlePagination = useCallback(
		(pageNumber: number) => {
			push(
				webRoutes.postAllContents.path +
					"?" +
					queryString.stringify({ ...query, pageNumber })
			);
		},
		[query]
	);

	return (
		<>
			<main>
				<AllItemsPageFloatingBox
					query={query}
					postCategories={categories}
					route={webRoutes.experienceAllContent.path}
				/>
				<div className="min-h-[70vh] pt-12 k-container">
					<Masonry
						breakpointCols={{
							default: 4,
							1600: 3,
							1100: 2,
							700: 2,
							500: 1,
						}}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{items.data.map((item) => {
							const image = getThumbnailFromContent(item);
							return (
								<FreeHeightCard
									key={item._id}
									category={item.experienceCategory.title}
									commentCount={item.commentCount}
									likeCount={item.likeCount}
									title={item.title}
									viewCount={item.viewCount}
									creationDate={dateObjectFormatter(
										item.creationDate
									)}
									isLiked={item.liked || false}
									height={image.height}
									width={image.width}
									imageAlt={image.imageAlt}
									imagePathname={image.imagePathname}
									isCommented={false}
									isVideo={image.isVideo}
									detailPath={
										webRoutes.experienceDetail.path + "/" + item._id
									}
								/>
							);
						})}
					</Masonry>
				</div>
				{items.totalPages > 1 && (
					<div className="flex justify-center my-6">
						<Pagination
							current={items.pageNumber}
							pageSize={items.pageSize}
							total={items.totalItems}
							onChange={handlePagination}
						/>
					</div>
				)}
			</main>
			<Footer
				{...defaultTexts}
				footer_image={defaultImages.footer_image}
				socialMedias={socialMedias}
			/>
		</>
	);
};

export default AllExperiencePage;
