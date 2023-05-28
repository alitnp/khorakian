import { iranSans } from "@/assets/fonts/iranSansFont";
import { FC, ReactNode } from "react";
import fa from "antd/lib/locale/fa_IR";
import { ConfigProvider } from "antd";
import InitialInfo from "@/components/global/InitialInfo/InitialInfo";
import LayoutHeader from "@/components/global/Layout/components/LayoutHeader";

interface ILayout {
	children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
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
						colorPrimary: "#a6373a",
						...iranSans.style,
					},
				}}
			>
				<InitialInfo />
				<LayoutHeader />
				<div className="w-full h-12 bg-k-text-color"></div>
				{children}
			</ConfigProvider>
		</div>
	);
};

export default Layout;
