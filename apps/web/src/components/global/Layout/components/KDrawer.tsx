import Navigation from "@/components/global/Layout/Navigation";
import webRoutes from "@/global/constants/routes";
import { RootState } from "@/redux/store";
import { Drawer } from "antd";
import Link from "next/link";
import { FC } from "react";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface IKDrawer {
	visible: boolean;
	close(): void;
}

const KDrawer: FC<IKDrawer> = ({ visible, close }) => {
	//states
	const { user } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<Drawer
			title="Basic Drawer"
			placement="right"
			onClose={close}
			open={visible}
		>
			<Navigation close={close} />
			<Link
				href={
					user ? webRoutes.dashboard.path : webRoutes.login.path
				}
				className="flex items-center gap-2 pt-4 mt-6 text-lg font-medium border-t"
			>
				<VscAccount />
				{!user ? "ورود به حساب" : "داشبورد"}
			</Link>
		</Drawer>
	);
};

export default KDrawer;
