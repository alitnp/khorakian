import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { webApiThenGeneric } from "@/global/utils/webApiThen";
import { IUserExperienceRead } from "@my/types";
import { ApiDataListResponse } from "@my/types";
import { FC, useState, useEffect } from "react";

const DashboardUserExperience: FC = () => {
	//state
	const [list, setList] =
		useState<ApiDataListResponse<IUserExperienceRead>>();
	console.log(list);
	//effect
	useEffect(() => {
		getList();
	}, []);

	//functions
	const getList = async () => {
		await WebApiService.get(
			webEndpointUrls.userExperienceGetAll
		).then((res: ApiDataListResponse<IUserExperienceRead>) =>
			webApiThenGeneric<
				ApiDataListResponse<IUserExperienceRead>,
				IUserExperienceRead[]
			>({
				res,
				notifFail: false,
				notifSuccess: false,
				onSuccess: setList,
			})
		).catch(()=>{});
	};

	return (
		<div>
			<h2 className="pb-2 mb-4 border-b">تجربیات من</h2>
		</div>
	);
};

export default DashboardUserExperience;
