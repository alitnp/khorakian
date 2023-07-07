import Comment from "@/components/post/postDetail/comments/Comment";
import CommentReplyes from "@/components/post/postDetail/comments/CommentReplyes";
import {
	ICommentReplyRead,
	IGlobalCommentRead,
} from "@my/types";
import React, { FC } from "react";
import MyButton from "@/components/basicUi/MyButton";

interface IProps {
	comments?: IGlobalCommentRead[];
	refetch: () => void;
	commentReplyUrl: string;
	toggleCreateModal: () => void;
}

const AllComments: FC<IProps> = ({
	comments,
	commentReplyUrl,
	refetch,
	toggleCreateModal,
}) => {
	return (
		<>
			<div className="flex justify-end">
				<MyButton
					onClick={toggleCreateModal}
					type="primary"
					className="m-3 sm:mt-4 sm:ml-4"
				>
					ثبت نظر جدید
				</MyButton>
			</div>
			<div className="px-2">
				{comments ? (
					comments?.map((item: IGlobalCommentRead) => {
						return (
							<div key={item._id} className="m-3 sm:p-3">
								<Comment
									commentReplyUrl={commentReplyUrl}
									item={item}
									refetch={refetch}
								/>
								<div className="my-2 mr-6">
									{item.replies?.map(
										(reply: ICommentReplyRead, index) => {
											return (
												<CommentReplyes reply={reply} key={index} />
											);
										}
									)}
								</div>
								<hr style={{ borderWidth: "1px" }} />
							</div>
						);
					})
				) : (
					<div className="flex items-center justify-center pb-5 mx-auto mb-4 text-base px-7 text-k-grey-text-color ">
						نظری یافت نشد...!
					</div>
				)}
			</div>
		</>
	);
};

export default AllComments;
