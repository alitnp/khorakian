import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataListResponse,
	ApiDataResponse,
	IAboutMeRead,
	IDefaultImageRead,
	IDefaultText,
	IImage,
	IPageItemConents,
	IPostRead,
} from "@my/types";

export const getHomePageItems = async (): Promise<
	ApiDataListResponse<IPageItemConents>
> => {
	const pageItems: ApiDataListResponse<IPageItemConents> =
		await serverSideFetch(
			webEndpointUrls.pageItemWithContent
		);
	if (!pageItems) {
		console.log(
			"error fetch : " + webEndpointUrls.pageItemWithContent
		);
	}
	return pageItems;
};

export const getHomeDefaultTexts = async (): Promise<
	Record<string, string>
> => {
	const defaultTexts: ApiDataListResponse<IDefaultText> =
		await serverSideFetch(
			webEndpointUrls.defautlTextGetAll + "?pageSize=200"
		);
	if (!defaultTexts) {
		console.log(
			"error fetch : " +
				webEndpointUrls.defautlTextGetAll +
				"?pageSize=200"
		);
	}
	const defaultTextsObject: Record<string, string> = {};
	defaultTexts.data.map((item) => {
		defaultTextsObject[item.key] = item.text;
	});
	return defaultTextsObject;
};

export const getHomeDefaultImages = async (): Promise<
	Record<string, IImage>
> => {
	const defaultImages: ApiDataListResponse<IDefaultImageRead> =
		await serverSideFetch(
			webEndpointUrls.defautlImageGetAll + "?pageSize=200"
		);
	if (!defaultImages) {
		console.log(
			"error fetch : " + webEndpointUrls.defautlImageGetAll
		);
	}
	const defaultImagesObject: Record<string, IImage> = {};
	defaultImages.data.map((item) => {
		defaultImagesObject[item.key] = item.image;
	});
	return defaultImagesObject;
};

export const getHomeAboutMePosts = async (): Promise<
	IPostRead[]
> => {
	const aboutMePosts: ApiDataListResponse<IAboutMeRead> =
		await serverSideFetch(
			webEndpointUrls.aboutMeGetAll + "?pageSize=200"
		);
	if (!aboutMePosts) {
		console.log(
			"error fetch : " + webEndpointUrls.defautlImageGetAll
		);
	}
	return aboutMePosts.data.map((item) => item.post);
};
