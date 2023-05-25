import { FC } from "react";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	ApiDataResponse,
	IDefaultImageRead,
	IImage,
} from "@my/types";
import { serverSideFetch } from "@/global/utils/webFetch";
import webConfig from "@/global/constants/webConfig";
import LoginRegisterLayout from "@/components/login/LoginLayout";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
	const image: ApiDataResponse<IDefaultImageRead> =
		await serverSideFetch(
			webEndpointUrls.getDefaultImageByKey("login_page")
		);
	if (!image.data) {
		console.log(
			"error fetch : " +
				webEndpointUrls.getDefaultImageByKey("login_page")
		);
	}
	return {
		props: {
			image: image?.data?.image ||null,
		},
		revalidate: webConfig.dataRevalidateTime,
	};
};

interface Ilogin {
	image: IImage;
}

const Login: FC<Ilogin> = ({ image }) => {
	return (
		<LoginRegisterLayout
			pathname={image?.pathname}
			height={image?.height}
			width={image?.width}
			imageAlt={image?.title}
		/>
	);
};

export default Login;
