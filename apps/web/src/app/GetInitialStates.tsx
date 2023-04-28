import { serverSideFetch } from "@/global/utils/webFetch";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { ApiDataResponse, IUserRead } from "@my/types";
import { setUser } from "@/redux/reducers/user/userReducer";
import { store } from "@/redux/store";
import { cookies } from "next/headers";
import { FC } from "react";

//@ts-ignore
const GetInitialStates:FC = async () => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;

if(token){	const user = await serverSideFetch<
		ApiDataResponse<IUserRead>
	>(webEndpointUrls.userWhoAmI, cookieStore);
	user && store.dispatch(setUser(user.data));}

	return <></>;
};

export default GetInitialStates;
