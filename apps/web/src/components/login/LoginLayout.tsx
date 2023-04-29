import LoginForm from "@/components/login/LoginForm";
import webConfig from "@/global/constants/webConfig";
import { Tabs } from "antd";
import Image from "next/image";
import { FC, useMemo, memo } from "react";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";

interface Ilogin {
	pathname: string;
	width: number;
	height: number;
}

const LoginRegisterLayout: FC<Ilogin> = ({
	pathname,
	width,
	height,
}) => {
	const tabItems = useMemo(
		() => [
			{
				label: (
					<span className="inline-block sm:px-6">
						<FiUserCheck className="inline ml-2" />
						ورود به حساب
					</span>
				),
				key: "login",
				children: <LoginForm />,
			},
			{
				label: (
					<span className="inline-block sm:px-6">
						<FiUserPlus className="inline ml-2" />
						ایجاد حساب
					</span>
				),
				key: "register",
				children: "asdfasdf",
			},
		],
		[]
	);
	return (
		<div className="w-full bg-k-grey-bg-1-color">
			<div className="relative">
				<Image
					src={webConfig.domain + pathname}
					width={width}
					height={height}
					alt=""
					className="object-cover w-full h-screen"
				/>
				<div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm" />
				<div className="absolute top-0 left-0 w-full h-full bg-slate-900/30" />
				<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full k-container">
					<div className="w-full max-w-xl rounded-lg shadow-2xl shadow-black/70 backdrop-blur-md backdrop-brightness-200 bg-white/50">
						<main>
							<Tabs
								size="large"
								defaultActiveKey="login"
								items={tabItems}
								centered
							/>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(LoginRegisterLayout);
