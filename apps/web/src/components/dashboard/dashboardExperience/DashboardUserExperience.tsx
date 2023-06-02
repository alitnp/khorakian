import MyButton from "@/components/basicUi/MyButton";
import CreateUserExperience from "@/components/dashboard/dashboardExperience/CreateUserExperience";
import DashboardExperienceList from "@/components/dashboard/dashboardExperience/DashboardExperienceList";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { webApiThenGeneric } from "@/global/utils/webApiThen";
import { IUserExperienceRead } from "@my/types";
import { ApiDataListResponse } from "@my/types";
import {
	FC,
	useState,
	useEffect,
	useMemo,
	useCallback,
	memo,
} from "react";
import queryString from "querystring";

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
	const getList = useCallback(
		async (
			pageNumber = 1,
			pageSize = 24,
			isApprove?: boolean
		) => {
			const payload: any = { pageNumber, pageSize };
			if (isApprove !== undefined)
				payload.isApprove = !!isApprove;

			await WebApiService.get(
				webEndpointUrls.getMyUserExperience +
					"?" +
					queryString.stringify(payload)
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
		},
		[]
	);

	//constants
	const emptyList = useMemo(() => {
		if (list && list.data.length > 0) return <></>;
		return (
			<div className="flex flex-col items-center gap-4 py-10">
				<span className="text-sm">
					تجربه ای برای درمیان گذاشتن با امیر خوراکیان یا اشتراک
					در سایت دارید؟
				</span>
				<MyButton size="small" onClick={toggleCreateModal}>
					ثبت تجربه جدید
				</MyButton>
			</div>
		);
	}, [list]);
	const renderList = useMemo(() => {
		if (!list) return <></>;
		return (
			<DashboardExperienceList list={list} refetch={getList} />
		);
	}, [list]);

	return (
		<div>
			{emptyList}
			{renderList}
			<CreateUserExperience
				visible={visible}
				close={toggleCreateModal}
				refetch={getList}
			/>
		</div>
	);
};

export default memo(DashboardUserExperience);
