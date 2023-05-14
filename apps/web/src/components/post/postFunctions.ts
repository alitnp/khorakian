import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataListResponse,
	IPostCategory,
	IPostRead,
} from "@my/types";
import { NextIncomingMessage } from "next/dist/server/request-meta";

export const getAllPostCategories = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<IPostCategory[]> => {
	const items: ApiDataListResponse<IPostCategory> =
		await serverSideFetch(
			webEndpointUrls.getAllPostCategories + "?pageSize=1000",
			req
		);
	if (!items) {
		console.log(
			"error fetch : " + webEndpointUrls.getAllPostCategories
		);
	}
	return items.data;
};

export const getAllPosts = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<IPostRead[]> => {
	const items: ApiDataListResponse<IPostRead> =
		await serverSideFetch(
			webEndpointUrls.getAllPosts + "?pageSize=50",
			req
		);
	if (!items) {
		console.log(
			"error fetch : " + webEndpointUrls.getAllPosts
		);
	}
	return items.data;
};
