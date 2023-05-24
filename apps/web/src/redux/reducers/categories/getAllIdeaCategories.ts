import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import {
	setExperienceCategories,
	setIdeaCategories,
	setPostCategories,
} from "@/redux/reducers/categories/categoriesReducer";
import { AppDispatch } from "@/redux/store";
import {
	ApiDataListResponse,
	IExperienceRead,
	IIdeaCategory,
	IPostCategory,
} from "@my/types";

export const getAllIdeaCategories =
	() => async (dispatch: AppDispatch) => {
		await WebApiService.get(
			webEndpointUrls.getAllIdeaCategories + "?pageSize=100"
		)
			.then((res: ApiDataListResponse<IIdeaCategory>) => {
				if (res.isSuccess)
					dispatch(setIdeaCategories(res.data));
			})
			.catch(() => {});
	};
