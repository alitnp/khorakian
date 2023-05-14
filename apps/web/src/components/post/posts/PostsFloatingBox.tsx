import { IPostCategory } from "@my/types";
import Link from "next/link";
import { FC, memo, useMemo } from "react";
import { ParsedUrlQuery } from "querystring";
import webRoutes from "@/global/constants/routes";
import queryString from "querystring";

interface IPostsFloatingBox {
	postCategories: IPostCategory[];
	query: ParsedUrlQuery;
}

const PostsFloatingBox: FC<IPostsFloatingBox> = ({
	postCategories,
	query,
}) => {
	//constants
	const renderCategories = useMemo(
		() => [
			<span className="py-1 text-sm text-k-grey-text-color">
				دسته بندی :
			</span>,
			<Link
				className={`${
					!query.postCategory
						? "text-k-primary-2-color bg-k-faded-primary-color"
						: "hover:bg-k-grey-bg-2-color"
				} px-2 py-1 text-sm rounded-lg`}
				href={
					webRoutes.postAllContents.path +
					"?" +
					queryString.stringify()
				}
			>
				همه
			</Link>,
			...postCategories.map((postCat) => (
				<Link
					className={`${
						query.postCategory === postCat._id
							? "text-k-primary-2-color bg-k-faded-primary-color"
							: "hover:bg-k-grey-bg-2-color"
					} px-2 py-1 text-sm rounded-lg`}
					href={
						webRoutes.postAllContents.path +
						"?postCategory=" +
						postCat._id
					}
					key={postCat._id}
				>
					{postCat.title}
				</Link>
			)),
		],
		[query]
	);

	return (
		<div className="sticky k-container top-14">
			<div className="w-full px-4 py-2 border shadow-lg rounded-xl border-k-border-2-color">
				<div className="flex items-center gap-2">
					{renderCategories}
				</div>
			</div>
		</div>
	);
};

export default memo(PostsFloatingBox);
