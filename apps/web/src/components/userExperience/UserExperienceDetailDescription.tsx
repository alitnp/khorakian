import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IUserExperienceRead } from "@my/types";
import React, { FC } from "react";

interface IProps {
	userExperience: IUserExperienceRead;
}

const UserExperienceDetailDescription: FC<IProps> = ({
	userExperience,
}) => (
	<div className="max-w-screen-lg mx-auto my-10 ">
		<h1 className="text-3xl font-bold">
			{userExperience?.title}
		</h1>
		<span className="text-xs text-t-secondary-color ">
			{dateObjectFormatter(
				userExperience?.creationDate,
				"DD MMMM YYYY"
			)}
		</span>

		<p className="my-3 text-sm">{userExperience?.text}</p>
	</div>
);

export default UserExperienceDetailDescription;
