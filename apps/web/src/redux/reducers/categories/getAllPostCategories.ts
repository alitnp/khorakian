import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import {
	setExperienceCategories,
	setPostCategories,
} from "@/redux/reducers/categories/categoriesReducer";
import { AppDispatch } from "@/redux/store";
import {
	ApiDataListResponse,
	IExperienceRead,
	IPostCategory,
} from "@my/types";

export const getAllPostCategories =
	() => async (dispatch: AppDispatch) => {
		await WebApiService.get(
			webEndpointUrls.getAllPostCategories + "?pageSize=100"
		)
			.then((res: ApiDataListResponse<IPostCategory>) => {
				if (res.isSuccess)
					dispatch(setPostCategories(res.data));
			})
			.catch(() => {});
	};
