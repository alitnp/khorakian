import webConfig from "@/global/constants/webConfig";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const serverSideFetch = async <T>(
	endpoint: string,
	cookies?: ReadonlyRequestCookies,
	options: RequestInit & {headers:{Authorization?:string}}={headers:{}}
): Promise<T> => {
	const token =cookies ? cookies.get("token")?.value : undefined;
	if (token) options.headers.Authorization = token;
	return await fetch(webConfig.baseUrl + endpoint, {
    ...options
	}).then((data: Response) => data.json());
};
