import { notificationType } from "@my/types";
import { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle, BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";

interface INotificatoinIcon {
	type: notificationType;
}

const NotificatoinIcon: FC<INotificatoinIcon> = ({
	type,
}) => {
	if (type === "comment")
		return <FaRegCommentDots className="shrink-0" />;
	if (type === "like")
		return <BiLike className="shrink-0" />;
	if (type === "error")
		return <BiErrorCircle className="shrink-0" />;
	if (type === "success")
		return <AiOutlineCheckCircle className="shrink-0" />;
	return (
		<MdOutlineNotificationsActive className="shrink-0" />
	);
};

export default NotificatoinIcon;
