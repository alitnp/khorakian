import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataListResponse,
	IExperienceCategory,
	IExperienceRead,
	IExperienceWithComments,
} from "@my/types";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import queryString, { ParsedUrlQuery } from "querystring";

export const getExperienceListWithComments = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<
	ApiDataListResponse<IExperienceWithComments>
> => {
	const items: ApiDataListResponse<IExperienceWithComments> =
		await serverSideFetch(
			webEndpointUrls.getAllExperienceWithComments +
				"?pageSize=30",
			req
		);
	if (!items) {
		console.log(
			"error fetch : " +
				webEndpointUrls.getAllExperienceWithComments
		);
	}
	return items;
};

export const getAllExperiences = async (
	req: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	},
	query: ParsedUrlQuery
): Promise<ApiDataListResponse<IExperienceRead>> => {
	const items: ApiDataListResponse<IExperienceRead> =
		await serverSideFetch(
			webEndpointUrls.getAllExperience +
				"?" +
				queryString.stringify({ pageSize: 50, ...query }),
			req
		);
	if (!items) {
		console.log(
			"error fetch : " + webEndpointUrls.getAllExperience
		);
	}
	return items;
};

export const getAllExperienceCategories = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<IExperienceCategory[]> => {
	const items: ApiDataListResponse<IExperienceCategory> =
		await serverSideFetch(
			webEndpointUrls.getAllExperienceCategories +
				"?pageSize=1000",
			req
		);
	if (!items) {
		console.log(
			"error fetch : " +
				webEndpointUrls.getAllExperienceCategories
		);
	}
	return items.data;
};

export const getUserExperienceCount = async (
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<number> => {
	const items: ApiDataListResponse<IExperienceCategory> =
		await serverSideFetch(
			webEndpointUrls.getApprovedUserExperience +
				"?pageSize=1",
			req
		);
	if (!items) {
		console.log(
			"error fetch : " +
				webEndpointUrls.getApprovedUserExperience
		);
		return 0;
	}
	return items.totalItems;
};
