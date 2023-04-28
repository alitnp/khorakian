import LoginRegisterTab from "@/app/(loginRegister)/(components)/LoginRegisterTab";
import webConfig from "@/global/constants/webConfig";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataResponse,
	IDefaultImageRead,
} from "@my/types";
import Image from "next/image";
import { ReactNode } from "react";
import { serverSideFetch } from "@/global/utils/webFetch";
import { store } from "@/redux/store";
import webRoutes from "@/global/constants/routes";
import { redirect } from "next/navigation";


const LoginRegisterLayout = async ({
	children,
}: {
	children: ReactNode;
}) => {
	const loginImage = await serverSideFetch<
		ApiDataResponse<IDefaultImageRead>
		>(webEndpointUrls.getDefaultImageByKey("login-page"));
	const user = store.getState().user.user
	if(!!user) redirect(webRoutes.home.path)

	return (
		<div className="w-full bg-k-grey-bg-1-color">
			<div className="relative">
				<Image
					src={webConfig.domain + loginImage.data.image.pathname}
					width={loginImage.data.image.width}
					height={loginImage.data.image.height}
					alt=""
					className="object-cover w-full h-screen"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-slate-900/30" />
				<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full k-container">
					<div className="w-full max-w-xl rounded-lg shadow-2xl shadow-black/70 backdrop-blur-md backdrop-brightness-200 bg-white/50">
						<LoginRegisterTab>{children}</LoginRegisterTab>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterLayout;
