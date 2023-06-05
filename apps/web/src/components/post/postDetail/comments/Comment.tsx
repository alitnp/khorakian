import { IGlobalCommentRead } from "@my/types";
import React, { FC, useState } from "react";
import { BsReply } from "react-icons/bs";
import AddCommentModal from "@/components/post/postDetail/comments/AddCommentModal";
import UserImageAndName from "@/components/post/postDetail/comments/UserImageAndName";

interface IProps {
	item: IGlobalCommentRead;
	isLiked?: boolean;
	refetch: () => void;
	commentReplyUrl: string;
}
const Comment: FC<IProps> = ({
	item,
	isLiked,
	refetch,
	commentReplyUrl,
}) => {
	//state
	const [showCommentModel, setShowCommentModel] =
		useState<boolean>(false);
	//func
	const toggleShow = () =>
		setShowCommentModel((prev) => !prev);

	return (
		<>
			<div className="grid ">
				<div className="flex justify-between" key={item._id}>
					<UserImageAndName
						user={item.user}
						creationDate={item.creationDate}
					/>
					<div
						onClick={() => setShowCommentModel(true)}
						className="flex items-center gap-1 mr-2 text-k-grey-text-color group k-comment-icon"
					>
						<span
							className={isLiked ? "text-k-secondary-color" : ""}
						>
							<BsReply className="text-lg" />
						</span>
						<span className="text-xs group-hover:text-k-secondary-color">
							پاسخ
						</span>
					</div>
				</div>
				<span className="my-2 mr-3 sm:text-base">
					{item.text}
				</span>
			</div>
			{showCommentModel && (
				<AddCommentModal
					title="پاسخ به نظر"
					visible={showCommentModel}
					close={toggleShow}
					endPointUrl={commentReplyUrl + "/" + item._id}
					footer={false}
					refetch={refetch}
				/>
			)}
		</>
	);
};

export default Comment;
