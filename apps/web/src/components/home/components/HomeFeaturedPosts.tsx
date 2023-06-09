import webRoutes from "@/global/constants/webRoutes";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import Link from "next/link";
import {
	FC,
	ReactNode,
	useMemo,
	memo,
	useCallback,
} from "react";

interface IHomeFeaturedPosts {
	activePost: number;
	activeCategory: string | undefined;
	setActivePost: (_index: number) => void;
	posts: IPostRead[];
	title: string;
}

const HomeFeaturedPosts: FC<IHomeFeaturedPosts> = ({
	activePost,
	activeCategory,
	setActivePost,
	posts,
	title,
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
				const isActive = index === activePost;
				return (
					<div
						key={post._id}
						className={`relative ${
							isActive
								? ""
								: "hover:bg-k-grey-bg-1-color cursor-pointer"
						} px-4 z-30 max-w-[300px] md:max-w-[unset]`}
						onClick={() => setActivePost(index)}
					>
						<div
							className={`${
								index !== 0 ? "md:border-t" : ""
							} py-2`}
						>
							<div
								className={`${
									isActive ? "text-k-primary-color" : ""
								} text-base font-medium line-clamp-1 max-w-[150px] md:max-w-[unset] whitespace-nowrap`}
							>
								{post.title}
							</div>
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
		<>
			<div className="flex items-center justify-between px-4 py-2 border-b md:hidden bg-k-bg-color ">
				<span className="font-medium">{title}</span>
				<Link
					href={
						webRoutes.postAllContents.path +
						"?postCategory=" +
						(activeCategory || "")
					}
					className="cursor-pointer text-k-primary-color hover:underline"
				>
					نمایش همه
				</Link>
			</div>
			<div className="relative flex flex-row md:flex-col md:w-44 lg:w-64 bg-k-bg-color shrink-0">
				<div className="sticky top-0 left-0 z-40 hidden px-4 py-2 font-medium border-b md:block bg-k-bg-color">
					{title}
				</div>

				<div className="flex overflow-y-auto md:overflow-visible md:flex-col">
					{renderPostsList}
				</div>

				<div className="hidden px-4 py-2 mt-auto text-center border-t md:block text-k-primary-color ">
					<Link
						href={
							webRoutes.postAllContents.path +
							"?postCategory=" +
							(activeCategory || "")
						}
						className="cursor-pointer hover:underline "
					>
						نمایش همه
					</Link>
				</div>
			</div>
		</>
	);
};

export default memo(HomeFeaturedPosts);
