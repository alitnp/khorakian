import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import webRoutes from "@/global/constants/webRoutes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { serverSideFetch } from "@/global/utils/webFetch";
import {
	ApiDataResponse,
	INotificationRead,
	IUserRead,
} from "@my/types";
import { GetServerSideProps } from "next";
import {
	FC,
	Fragment,
	useEffect,
	useMemo,
	useState,
} from "react";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import NotificatoinIcon from "@/components/dashboard/dashboard/NotificatoinIcon";
import Link from "next/link";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";

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
	//states
	const [notifications, setNotifications] = useState<
		INotificationRead[]
	>([]);

	//effect
	useEffect(() => {
		getMyNotifictions();
	}, []);

	//functions
	const getMyNotifictions = async () => {
		await WebApiService.get(
			webEndpointUrls.notificationGetAll
		)
			.then((res: ApiDataResponse<INotificationRead[]>) =>
				webApiThenGeneric<
					ApiDataResponse<INotificationRead[]>,
					INotificationRead[]
				>({
					res,
					notifFail: true,
					notifSuccess: false,
					onSuccessData: setNotifications,
				})
			)
			.catch(() => webApiCatch(errorResponse));
	};

	const renderNotifications = useMemo(
		() =>
			notifications.map((notif) => (
				<Fragment key={notif._id}>
					<Link
						href={
							notif.frontEndRoute.path + "/" + notif.contextId
						}
						key={notif._id}
						className="block px-2 py-1 rounded-lg cursor-pointer hover:bg-k-grey-bg-1-color"
					>
						<div className="flex flex-col sm:gap-2 sm:items-center sm:flex-row">
							<div className="flex items-center gap-2">
								<NotificatoinIcon type={notif.notificatoinType} />
								<span>{notif.title}</span>
								<span className="mr-auto text-xs sm:hidden">
									{dateObjectFormatter(notif.creationDate)}
								</span>
							</div>
							<span className="hidden sm:block"> | </span>
							<span className="text-sm text-k-grey-text-color">
								{notif.text}
							</span>
							<span className="hidden mr-auto text-xs sm:block">
								{dateObjectFormatter(notif.creationDate)}
							</span>
						</div>
					</Link>
					<hr className="my-1" />
				</Fragment>
			)),
		[notifications]
	);

	return (
		<DashboardLayout>
			<DashboardPageTitle title="داشبورد" />
			<div className="">{renderNotifications}</div>
		</DashboardLayout>
	);
};

export default Dashboard;
