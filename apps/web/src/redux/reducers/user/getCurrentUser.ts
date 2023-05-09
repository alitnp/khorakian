import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { setUser } from "@/redux/reducers/user/userReducer";
import { AppDispatch } from "@/redux/store";

export const getCurrentUser =
	() => async (dispatch: AppDispatch) => {
		await WebApiService.get(webEndpointUrls.userWhoAmI)
			.then((res: any) => {
				if (res.isSuccess) dispatch(setUser(res.data));
			})
			.catch(() => {});
	};
