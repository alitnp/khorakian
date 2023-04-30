import webConfig from "@/global/constants/webConfig";

export const serverSideFetch = async <T>(
	endpoint: string,
	options = {}
): Promise<T> => {
	return await fetch(webConfig.baseUrl + endpoint, {
		...options,
	}).then((data: Response) => data.json());
};
