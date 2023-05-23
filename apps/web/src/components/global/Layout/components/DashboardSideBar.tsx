import DashboardSidebarItem from "@/components/global/Layout/components/DashboardSidebarItem";
import webRoutes from "@/global/constants/routes";
import { logout } from "@/redux/reducers/user/userReducer";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

interface IDashboardSideBar {}

const DashboardSideBar: FC<IDashboardSideBar> = ({}) => {
	//hooks
	const { push } = useRouter();

	//functions
	const handleLogout = useCallback(() => {
		store.dispatch(logout());
		push(webRoutes.home.path);
	}, []);

	return (
		<div className="flex flex-col gap-1 p-1 border shadow-lg rounded-xl bg-k-bg-color shrink-0">
			<DashboardSidebarItem
				title="حساب کاربری"
				path={webRoutes.dashboard.path}
			/>
			<DashboardSidebarItem
				title="تجربیات من"
				path={webRoutes.dashboardExperience.path}
			/>
			<DashboardSidebarItem
				title="ایده های من"
				path={webRoutes.experience.path}
			/>
			<DashboardSidebarItem
				title="نظرهای من"
				path={webRoutes.experience.path}
			/>
			<div
				className="px-6 py-2 mt-auto text-center rounded-lg cursor-pointer hover:bg-k-grey-bg-2-color"
				onClick={handleLogout}
			>
				خروج
			</div>
		</div>
	);
};

export default DashboardSideBar;
