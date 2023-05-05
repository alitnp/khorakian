import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import {
	FC,
	ReactNode,
	useMemo,
	memo,
	useCallback,
} from "react";

interface IHomeFeaturedPosts {
	activePost: IPostRead;
	activeCategory: string | undefined;
	setActivePost: (_post: IPostRead) => void;
	posts: IPostRead[];
}

const HomeFeaturedPosts: FC<IHomeFeaturedPosts> = ({
	activePost,
	activeCategory,
	setActivePost,
	posts,
}) => {
	const getPosts = useCallback((): IPostRead[] => {
		if (!activeCategory) return posts;
		return posts.filter(
			(post) => post.postCategory._id === activeCategory
		);
	}, [activeCategory]);

	const renderPostsList = useMemo(
		(): ReactNode[] =>
			getPosts().map((post, index) => {
				const isActive = activePost._id === post._id;
				return (
					<div
						key={post._id}
						className={`relative ${
							isActive
								? ""
								: "hover:bg-k-grey-bg-1-color cursor-pointer"
						} px-4`}
						onClick={() => setActivePost(post)}
					>
						<div
							className={`${index !== 0 ? "border-t" : ""} py-2`}
						>
							<span
								className={`${
									isActive ? "text-k-primary-color" : ""
								} block text-base font-medium `}
							>
								{post.title}
							</span>
							<span className="text-xs text-k-grey-text-color">
								{dateObjectFormatter(post.eventDate)}
							</span>
						</div>
						{isActive && (
							<div className="absolute w-4 h-4 rotate-45 -translate-y-1/2 top-1/2 -left-2 bg-k-bg-color" />
						)}
					</div>
				);
			}),
		[activeCategory, activePost]
	);
	return (
		<div className="flex flex-col bg-k-bg-color w-fit grow-0 max-w-[200px] min-w-[150px]">
			{renderPostsList}
		</div>
	);
};

export default memo(HomeFeaturedPosts);
