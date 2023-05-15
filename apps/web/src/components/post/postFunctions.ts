import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataListResponse,
	IPostCategory,
	IPostRead,
} from "@my/types";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import queryString from "querystring";
import { ParsedUrlQuery } from "querystring";

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
	req: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	},
	query: ParsedUrlQuery
): Promise<IPostRead[]> => {
	console.log(
		webEndpointUrls.getAllPosts +
			"?" +
			queryString.stringify({ pageSize: 50, ...query })
	);
	const items: ApiDataListResponse<IPostRead> =
		await serverSideFetch(
			webEndpointUrls.getAllPosts +
				"?" +
				queryString.stringify({ pageSize: 50, ...query }),
			req
		);
	if (!items) {
		console.log(
			"error fetch : " + webEndpointUrls.getAllPosts
		);
	}
	return items.data;
};
