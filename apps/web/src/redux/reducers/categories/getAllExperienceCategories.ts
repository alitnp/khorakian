import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { setExperienceCategories } from "@/redux/reducers/categories/categoriesReducer";
import { AppDispatch } from "@/redux/store";
import {
	ApiDataListResponse,
	IExperienceRead,
} from "@my/types";

export const getAllExperienceCategories =
	() => async (dispatch: AppDispatch) => {
		await WebApiService.get(
			webEndpointUrls.getAllExperienceCategories +
				"?pageSize=100"
		)
			.then((res: ApiDataListResponse<IExperienceRead>) => {
				if (res.isSuccess)
					dispatch(setExperienceCategories(res.data));
			})
			.catch(() => {});
	};
