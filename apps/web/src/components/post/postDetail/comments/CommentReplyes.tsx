import CommentUser from "@/components/post/postDetail/comments/CommentUser";
import { ICommentReplyRead } from "@my/types";
import React, { FC } from "react";

interface IProps {
	reply: ICommentReplyRead;
	isLiked?: boolean;
}

const CommentReplyes: FC<IProps> = ({ reply }) => (
	<>
		<div className="grid mt-2 rounded-md">
			<CommentUser
				user={reply.user}
				creationDate={reply.creationDate}
			/>
			<span className="my-2 mr-3 sm:text-base">
				{reply.text}
			</span>
		</div>
	</>
);

export default CommentReplyes;
