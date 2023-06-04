import webConfig from "@/global/constants/webConfig";
import { NextIncomingMessage } from "next/dist/server/request-meta";

export const serverSideFetch = async <T>(
	endpoint: string,
	req?: NextIncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	}
): Promise<T> => {
	const token = req?.cookies[webConfig.cookieTokenName];
	const options: any = {};
	if (token)
		options.headers = {
			authorization: req.cookies[webConfig.cookieTokenName],
		};
	return await fetch(
		webConfig.baseUrl + endpoint,
		options
	).then((data: Response) => data.json());
};

// import webConfig from '@/global/constants/webConfig';
// import { IncomingMessage } from 'http';

// type Cookies = {
//   [key: string]: string;
// };

// export const serverSideFetch = async <T>(
//   endpoint: string,
//   req?: IncomingMessage & { cookies?: Cookies }
// ): Promise<T> => {
//   const token = req?.cookies?.token;
//   const headers = token ? { authorization: token } : undefined;
//   const response = await fetch(webConfig.baseUrl + endpoint, { headers });
//   return response.json();
// };
