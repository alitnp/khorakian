import { IPostCategory } from "@my/types";
import Link from "next/link";
import { FC, memo, useMemo } from "react";
import { ParsedUrlQuery } from "querystring";
import webRoutes from "@/global/constants/routes";
import queryString from "querystring";
import { Select } from "antd";
import { useRouter } from "next/router";

interface IPostsFloatingBox {
	postCategories: IPostCategory[];
	query: ParsedUrlQuery;
}

const PostsFloatingBox: FC<IPostsFloatingBox> = ({
	postCategories,
	query,
}) => {
	//hooks
	const { push } = useRouter();

	//constants
	const renderCategories = useMemo(
		() => [
			<span className="py-1 text-sm font-light whitespace-nowrap text-k-grey-text-color">
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
					} px-2 py-1 text-sm rounded-lg whitespace-nowrap`}
					href={
						webRoutes.postAllContents.path +
						"?" +
						queryString.stringify({
							...query,
							postCategory: postCat._id,
						})
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
		<div className="sticky z-50 k-container top-14">
			<div className="flex flex-col items-center justify-between w-full px-4 py-2 border shadow-lg rounded-xl border-k-border-2-color md:flex-row bg-k-bg-color">
				<div className="flex flex-wrap items-center justify-center w-full gap-2 md:justify-start">
					{renderCategories}
				</div>
				<div className="flex items-center gap-x-2 shrink-0">
					<label
						htmlFor="sort-select"
						className="text-sm font-light text-k-grey-text-color whitespace-nowrap"
					>
						ترتیب :
					</label>
					<Select
						className="min-w-[120px] "
						value={query.sort || ""}
						bordered={false}
						onChange={(e) =>
							push(
								webRoutes.postAllContents.path +
									"?" +
									queryString.stringify({ ...query, sort: e })
							)
						}
						id="sort-select"
						options={[
							{ label: "جدیدترین", value: "" },
							{ label: "بازدید", value: "viewCount" },
							{ label: "پسند", value: "likeCount" },
							{ label: "نظر", value: "commentCount" },
							{ label: "زمان وقوع", value: " eventDate" },
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(PostsFloatingBox);
