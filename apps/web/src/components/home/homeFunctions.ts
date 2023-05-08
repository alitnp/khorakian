import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataListResponse,
	IAboutMeRead,
	IDefaultImageRead,
	IDefaultText,
	IHistory,
	IImage,
	IPageItemConents,
	ISocialMediaRead,
} from "@my/types";
import { NextIncomingMessage } from "next/dist/server/request-meta";

export const getHomePageItems = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<ApiDataListResponse<IPageItemConents>> => {
	const pageItems: ApiDataListResponse<IPageItemConents> =
		await serverSideFetch(
			webEndpointUrls.pageItemWithContent,
			req
		);
	if (!pageItems) {
		console.log(
			"error fetch : " + webEndpointUrls.pageItemWithContent
		);
	}
	return pageItems;
};

export const getHomeDefaultTexts = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<Record<string, string>> => {
	const defaultTexts: ApiDataListResponse<IDefaultText> =
		await serverSideFetch(
			webEndpointUrls.defautlTextGetAll + "?pageSize=200",
			req
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

export const getHomeDefaultImages = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<Record<string, IImage>> => {
	const defaultImages: ApiDataListResponse<IDefaultImageRead> =
		await serverSideFetch(
			webEndpointUrls.defautlImageGetAll + "?pageSize=200",
			req
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

export const getHomeAboutMePosts = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<IAboutMeRead[]> => {
	const aboutMePosts: ApiDataListResponse<IAboutMeRead> =
		await serverSideFetch(
			webEndpointUrls.aboutMeGetAll + "?pageSize=200",
			req
		);
	if (!aboutMePosts) {
		console.log(
			"error fetch : " + webEndpointUrls.defautlImageGetAll
		);
	}
	return aboutMePosts.data;
};

export const getAllSocialMedias = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<ISocialMediaRead[]> => {
	const socialMedias: ApiDataListResponse<ISocialMediaRead> =
		await serverSideFetch(
			webEndpointUrls.socialMediaGetAll + "?pageSize=100"
		);
	if (!socialMedias) {
		console.log(
			"error fetch : " + webEndpointUrls.socialMediaGetAll,
			req
		);
	}
	return socialMedias.data;
};

export const getAllHistories = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<IHistory[]> => {
	const histories: ApiDataListResponse<IHistory> =
		await serverSideFetch(
			webEndpointUrls.historyGetAll + "?pageSize=100",
			req
		);
	if (!histories) {
		console.log(
			"error fetch : " + webEndpointUrls.historyGetAll
		);
	}
	return histories.data;
};
