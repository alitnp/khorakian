import Navigation from "@/components/global/Layout/Navigation";
import Link from "next/link";
import { FC, useState, useCallback } from "react";
import { TfiMenu } from "react-icons/tfi";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import webRoutes from "@/global/constants/routes";
import KDrawer from "@/components/global/Layout/components/KDrawer";

const LayoutHeader: FC = () => {
	//states
	const [isDrawerOpen, setIsDrawerOpen] =
		useState<boolean>(false);
	const { user } = useSelector(
		(state: RootState) => state.user
	);

	//functions
	const toggleDrawerOpen = useCallback(
		() => setIsDrawerOpen((prevState) => !prevState),
		[]
	);

	return (
		<header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-12 bg-k-faded-dark-bg-color text-k-opposite-text-color k-container ">
			<div className="hidden md:block">
				<Navigation />
			</div>
			<div className="block md:hidden">
				<TfiMenu
					onClick={toggleDrawerOpen}
					className="cursor-pointer text-k-bg-color"
				/>
			</div>
			<Link
				href={
					user ? webRoutes.dashboard.path : webRoutes.login.path
				}
				className="flex items-center gap-2"
			>
				{user ? "داشبورد" : "ورود به حساب"}
				<VscAccount />
			</Link>
			<KDrawer
				visible={isDrawerOpen}
				close={toggleDrawerOpen}
			/>
		</header>
	);
};

export default LayoutHeader;
