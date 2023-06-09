import webConfig from "@/global/constants/webConfig";
import webRoutes from "@/global/constants/webRoutes";
import { getImageFromContent } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo } from "react";

interface IHomeFeatureActivePost {
	post: IPostRead;
}

const HomeFeatureActivePost: FC<IHomeFeatureActivePost> = ({
	post,
}) => {
	const image = useMemo(
		() => getImageFromContent(post),
		[post]
	);

	return (
		<Link
			href={webRoutes.postDetail.path + "/" + post._id}
			className="relative w-full h-[500px] overflow-hidden z-0"
		>
			<div className="absolute top-0 left-0 z-10 w-full">
				{image && (
					<Image
						src={webConfig.domain + image.pathname}
						width={image.width}
						height={image.height}
						alt={image.title}
						className="h-[500px] object-cover z-50 mx-auto"
					/>
				)}
			</div>
			{image && (
				<Image
					src={webConfig.domain + image.pathname}
					fill
					alt={image.title}
					className="h-[500px] object-cover z-0 scale-110 blur-lg brightness-50"
				/>
			)}
			<div className="absolute top-0 left-0 z-20 w-full h-full bg-slate-800/20">
				<div className="relative w-full h-full">
					<div className="absolute bottom-6 right-6 left-6 text-k-bg-color">
						<span className="text-lg font-bold">
							{post.title}
						</span>
						<span className="line-clamp-1">{post.text}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default HomeFeatureActivePost;
