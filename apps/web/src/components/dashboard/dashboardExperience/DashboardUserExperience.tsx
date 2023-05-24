import MyButton from "@/components/basicUi/MyButton";
import CreateUserExperience from "@/components/dashboard/dashboardExperience/CreateUserExperience";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { webApiThenGeneric } from "@/global/utils/webApiThen";
import { IUserExperienceRead } from "@my/types";
import { ApiDataListResponse } from "@my/types";
import { FC, useState, useEffect } from "react";

interface IDashboardUserExperience {
	visible: boolean;
	toggleCreateModal: () => void;
}

const DashboardUserExperience: FC<
	IDashboardUserExperience
> = ({ visible, toggleCreateModal }) => {
	//state
	const [list, setList] =
		useState<ApiDataListResponse<IUserExperienceRead>>();

	//effect
	useEffect(() => {
		getList();
	}, []);

	//functions
	const getList = async () => {
		await WebApiService.get(
			webEndpointUrls.userExperienceGetAll
		)
			.then((res: ApiDataListResponse<IUserExperienceRead>) =>
				webApiThenGeneric<
					ApiDataListResponse<IUserExperienceRead>,
					IUserExperienceRead[]
				>({
					res,
					notifFail: false,
					notifSuccess: false,
					onSuccess: setList,
				})
			)
			.catch(() => {});
	};

	return (
		<div>
			{!list ||
				(list.data.length === 0 && (
					<div className="flex flex-col items-center gap-4 py-10">
						<span className="text-sm">
							تجربه ای برای درمیان گذاشتن با امیر خوراکیان یا
							اشتراک در سایت دارید؟
						</span>
						<MyButton size="small" onClick={toggleCreateModal}>
							ثبت تجربه جدید
						</MyButton>
					</div>
				))}
			<CreateUserExperience
				visible={visible}
				close={toggleCreateModal}
			/>
		</div>
	);
};

export default DashboardUserExperience;
