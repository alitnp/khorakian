import { IUserRead } from "@my/types";
import { FC } from "react";

interface IUserInfo {
	user?: IUserRead;
}

const UserInfo: FC<IUserInfo> = ({ user }) => {
	if (!user) return <></>;
	return (
		<div className="py-6 text-center">
			<div className="">
				<span className="text-k-grey-text-color">
					نام و نام خانوادگی :{" "}
				</span>
				<span>{user.fullName}</span>
			</div>
			<div className="">
				<span className="text-k-grey-text-color">شماره موبایل : </span>
				<span>{user.mobileNumber}</span>
			</div>
		</div>
	);
};

export default UserInfo;
