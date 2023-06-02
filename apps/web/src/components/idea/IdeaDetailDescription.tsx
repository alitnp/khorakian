import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IIdeaRead } from "@my/types";
import React, { FC } from "react";

interface IProps {
	idea: IIdeaRead;
}

const IdeaDetailDescription: FC<IProps> = ({ idea }) => (
	<div className="max-w-screen-lg mx-auto my-10 ">
		<h1 className="text-3xl font-bold">{idea?.title}</h1>
		<span className="text-xs text-t-secondary-color ">
			{dateObjectFormatter(idea?.creationDate, "DD MMMM YYYY")}
		</span>

		<p className="my-3 text-sm">{idea?.text}</p>
	</div>
);

export default IdeaDetailDescription;
