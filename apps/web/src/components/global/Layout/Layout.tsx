import { iranSans } from "@/assets/fonts/iranSansFont";
import Navigation from "@/components/global/Layout/Navigation";
import { Drawer } from "antd";
import Link from "next/link";
import {
	FC,
	ReactNode,
	useState,
	useCallback,
} from "react";
import { TfiMenu } from "react-icons/tfi";
import { VscAccount } from "react-icons/vsc";
import fa from "antd/lib/locale/fa_IR";
import { ConfigProvider } from "antd";

interface ILayout {
	children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	//states
	const [isDrawerOpen, setIsDrawerOpen] =
		useState<boolean>(false);

	//functions
	const toggleDrawerOpen = useCallback(
		() => setIsDrawerOpen((prevState) => !prevState),
		[]
	);

	return (
		<div
			className={`
		// ${iranSans.variable}
		font-iransans`}
		>
			<ConfigProvider
				locale={fa}
				direction="rtl"
				theme={{
					token: {
						colorPrimary: "#EE5054",
						...iranSans.style,
					},
				}}
			>
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
						href="/login"
						className="flex items-center gap-2"
					>
						صفحه من
						<VscAccount />
					</Link>
					<Drawer
						title="Basic Drawer"
						placement="right"
						onClose={toggleDrawerOpen}
						open={isDrawerOpen}
					>
						<p className="mb-4 text-lg font-medium">صفحه من</p>

						<Navigation close={toggleDrawerOpen} />
					</Drawer>
				</header>
				{children}
			</ConfigProvider>
		</div>
	);
};

export default Layout;
