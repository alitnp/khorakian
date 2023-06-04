import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import UserChangePassword from "@/components/dashboard/dashboardProfile/UserChangePassword";
import UserInfo from "@/components/dashboard/dashboardProfile/UserInfo";
import UserProfileImage from "@/components/dashboard/dashboardProfile/UserProfileImage";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import { RootState } from "@/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";



const Dashboard: FC = () => {
	const { user } = useSelector(
		(state: RootState) => state.user
	);
	return (
		<DashboardLayout>
			<DashboardPageTitle title="حساب کاربری" />
			<UserProfileImage user={user} />
			<UserInfo user={user} />
			<UserChangePassword />
		</DashboardLayout>
	);
};

export default Dashboard;
