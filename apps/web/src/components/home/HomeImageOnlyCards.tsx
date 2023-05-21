import ImageOnlyCard from "@/components/global/Card/ImageOnlyCard";
import ImageOnlyCardsRow from "@/components/global/PageItems/ImageOnlyCardsRow";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import {
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { IPageItemConents } from "@my/types";
import { FC, useMemo } from "react";

interface IHomeImageOnlyCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeImageOnlyCards: FC<IHomeImageOnlyCards> = ({
	data,
	greyBg,
}) => {
	const moreUrl = useMemo(
		() => getMoreUrlPathFromPageItem(data.type.title),
		[data.type.title]
	);
	const detailPathname = useMemo(
		() => getDetailPathnameforPageItem(data.type.title),
		[data.type.title]
	);

	return (
		<ImageOnlyCardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any) => (
				<ImageOnlyCard
					key={item._id}
					{...getThumbnailFromContent(item)}
					title={item.title}
					likeCount={item.likeCount}
					commentCount={item.commentCount}
					viewCount={item.viewCount}
					detailPath={detailPathname + "/" + item._id}
					isLiked={false}
					isCommented={false}
				/>
			))}
		/>
	);
};

export default HomeImageOnlyCards;
