import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import webRoutes from "@/global/constants/routes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import { ApiDataResponse, IUserRead } from "@my/types";
import { GetServerSideProps } from "next";
import { FC } from "react";

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
			props: { user: user.data },
		};
	};

interface IDashboard {
	user: IUserRead;
}

const Dashboard: FC<IDashboard> = ({ user }) => {
	return <DashboardLayout>asdfasdf</DashboardLayout>;
};

export default Dashboard;