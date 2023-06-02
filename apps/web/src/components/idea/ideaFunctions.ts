import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";

export const handleIdeaLike = async (
	_id: string,
	callBack: () => void
) => {
	await WebApiService.post(
		webEndpointUrls.ideaLike + "/" + _id
	)
		.then((res: any) =>
			webApiThen({
				res,
				notifFail: true,
				notifSuccess: false,
				onSuccess: () => callBack(),
				dataOnly: true,
			})
		)
		.catch(() => webApiCatch(errorResponse));
};
