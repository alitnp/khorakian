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
	const token = req?.cookies?.token;
	const options: any = {};
	if (token)
		options.headers = { authorization: req.cookies.token };
	return await fetch(
		webConfig.baseUrl + endpoint,
		options
	).then((data: Response) => data.json());
};
