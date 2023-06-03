import {
	ApiDataListResponse,
	IExperienceCategory,
	IExperienceRead,
	IImage,
	ISocialMediaRead,
} from "@my/types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC, useCallback, useState } from "react";
import {
	dateObjectFormatter,
	getContentLikeEndpoint,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import webRoutes from "@/global/constants/webRoutes";
import FreeHeightCard from "@/components/home/FreeHeightCard";
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
import MyMasonry from "@/components/global/Masonry/MyMasonry";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { webApiCatch } from "@/global/utils/webApiThen";

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
	//states
	const [, setFakeNumber] = useState<number>(1);

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

	const handleContentLike = async (
		_id: string,
		index: number
	) => {
		await WebApiService.post(
			getContentLikeEndpoint("experience", _id)
		)
			.then((res: any) => {
				items.data[index] = res.data;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<>
			<main>
				<AllItemsPageFloatingBox
					query={query}
					postCategories={categories}
					route={webRoutes.experienceAllContent.path}
				/>
				<div className="min-h-[70vh] pt-12 k-container">
					<MyMasonry>
						{items.data.map((item, index) => {
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
									handleLike={() =>
										handleContentLike(item._id, index)
									}
								/>
							);
						})}
					</MyMasonry>
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
