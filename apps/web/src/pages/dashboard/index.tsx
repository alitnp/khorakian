import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import UserChangePassword from "@/components/dashboard/dashboard/UserChangePassword";
import UserInfo from "@/components/dashboard/dashboard/UserInfo";
import UserProfileImage from "@/components/dashboard/dashboard/UserProfileImage";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import webRoutes from "@/global/constants/routes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import { RootState } from "@/redux/store";
import { ApiDataResponse, IUserRead } from "@my/types";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { useSelector } from "react-redux";

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const user = await serverSideFetch<
			ApiDataResponse<IUserRead>
		>(webEndpointUrls.userWhoAmI, context.req);

		if (!user?.data)
			return {
				redirect: {
					destination: webRoutes.login.path,
					permanent: false,
				},
			};
		return {
			props: {},
		};
	};

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
