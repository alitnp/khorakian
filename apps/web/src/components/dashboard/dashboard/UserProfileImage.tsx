import MyButton from "@/components/basicUi/MyButton";
import { ChangeEvent, FC, useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import Loading from "@/components/global/Loading/Loading";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { store } from "@/redux/store";
import { getCurrentUser } from "@/redux/reducers/user/getCurrentUser";
import Image from "next/image";
import webConfig from "@/global/constants/webConfig";
import { IUserRead } from "@my/types";

const UserProfileImage: FC<{ user?: IUserRead }> = ({
	user,
}) => {
	//states
	const [loading, setLoading] = useState<boolean>(false);

	//ref
	const inputRef = useRef<HTMLInputElement>(null);

	//functions
	const handleAddFileClick = () => {
		if (!inputRef.current) return;
		inputRef.current.click();
	};
	const handleFileInputChange = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (!e.target.files || e.target.files.length === 0)
			return;

		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		setLoading(true);
		await WebApiService.post(
			webEndpointUrls.userUploadProfile,
			formData
		)
			.then((res: any) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => store.dispatch(getCurrentUser()),
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<div className="relative flex flex-col items-center mt-6">
			{!user?.image && (
				<div className="flex items-center justify-center w-20 h-20 rounded-full bg-k-grey-bg-2-color">
					<UserOutlined className="text-3xl" />
				</div>
			)}
			{user?.image && webConfig.domain && (
				<Image
					src={webConfig.domain + user.image.thumbnailPathname}
					width={192}
					height={192}
					alt={user.fullName}
					className="object-cover w-48 h-48 overflow-hidden rounded-full"
				/>
			)}
			<MyButton className="mt-4" onClick={handleAddFileClick}>
				{user?.image ? "تغییر" : "بارگزاری"} عکس پروفایل
			</MyButton>
			<input
				className="hidden"
				type="file"
				ref={inputRef}
				onChange={handleFileInputChange}
			/>
			{loading && <Loading />}
		</div>
	);
};

export default UserProfileImage;
