import { IPostCategory, IPostRead } from "@my/types";
import { FC, ReactNode, memo } from "react";
import { useMemo } from "react";

interface IHomeFeaturedCategories {
	activeCategory: string | undefined;
	setActiveCategory: (_id: string | undefined) => void;
	posts: IPostRead[];
	setActivePost: (index: number) => void;
}

const HomeFeaturedCategories: FC<
	IHomeFeaturedCategories
> = ({
	activeCategory,
	setActiveCategory,
	posts,
	setActivePost,
}) => {
	const categoriyChips: ReactNode[] = useMemo(() => {
		const cats: IPostCategory[] = [];
		posts.map((post) => {
			if (
				!cats.some((item) => item._id === post.postCategory._id)
			)
				cats.push(post.postCategory);
		});
		const catChips: ReactNode[] = [];
		const chipClassNames = (active: boolean) =>
			`${
				active
					? "bg-k-faded-primary-color text-k-primary-2-color"
					: "hover:bg-k-grey-bg-2-color"
			} px-4 py-1 rounded-md cursor-pointer `;
		catChips.push(
			<div
				key={"asdfasf"}
				onClick={() => {
					setActiveCategory(undefined);
					setActivePost(0);
				}}
				className={chipClassNames(activeCategory === undefined)}
			>
				همه
			</div>
		);
		cats.map((item) =>
			catChips.push(
				<div
					key={item._id}
					onClick={() => {
						setActiveCategory(item._id);
						setActivePost(0);
					}}
					className={chipClassNames(activeCategory === item._id)}
				>
					{item.title}
				</div>
			)
		);
		return catChips;
	}, [activeCategory]);

	return (
		<div className="flex items-center justify-center gap-4 py-2 border rounded-lg shadow-sm shrink-0 bg-k-bg-color">
			{categoriyChips}
		</div>
	);
};

export default memo(HomeFeaturedCategories);
