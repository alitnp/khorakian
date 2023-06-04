import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import {
	logout,
	setUser,
} from "@/redux/reducers/user/userReducer";
import { AppDispatch } from "@/redux/store";

export const getCurrentUser =
	() => async (dispatch: AppDispatch) => {
		return await WebApiService.get(webEndpointUrls.userWhoAmI)
			.then((res: any) => {
				if (res.isSuccess) {
					dispatch(setUser(res.data));
					return res.data;
				} else {
					dispatch(logout());
					return undefined;
				}
			})
			.catch(() => {
				dispatch(logout());
				return undefined;
			});
	};
