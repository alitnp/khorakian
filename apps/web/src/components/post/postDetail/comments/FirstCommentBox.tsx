import AddCommentModal from "@/components/post/postDetail/comments/AddCommentModal";

import React, { FC, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";

interface IProps {
	refetch: () => void;
	commentCreateUrl: string;
	parentId: string | number;
}

const FirstCommentBox: FC<IProps> = ({
	refetch,
	commentCreateUrl,
	parentId,
}) => {
	//state
	const [showCommentModel, setShowCommentModel] =
		useState<boolean>(false);
	//func
	const toggleShow = () =>
		setShowCommentModel((prev) => !prev);

	return (
		<>
			<div className="flex flex-col items-center justify-center p-4 transition hover:text-k-text-color bg-k-grey-bg-1-color rounded-xl">
				<span className="text-sm">
					تا کنون نظری در این باره ثبت نشده
				</span>
				<span
					onClick={() => setShowCommentModel(true)}
					className="cursor-pointer text-k-primary-color"
				>
					<FaRegCommentDots className="inline ml-2 shrink-0" />
					ثبت نظر
				</span>
			</div>

			{showCommentModel && (
				<AddCommentModal
					title="ثبت نظر "
					visible={showCommentModel}
					close={toggleShow}
					endPointUrl={commentCreateUrl + "/" + parentId}
					footer={false}
					refetch={refetch}
				/>
			)}
		</>
	);
};

export default FirstCommentBox;
