import WideCard from "@/components/global/Card/WideCard";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import WideCardsRow from "@/components/global/PageItems/WideCardsRow";
import {
	dateObjectFormatter,
	getCategoryKeyNameFormPageItem,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { IPageItemConents } from "@my/types";
import { FC, useMemo } from "react";

interface IHomeWideCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeWideCards: FC<IHomeWideCards> = ({
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
	const categoryKeyName: string = useMemo(
		() => getCategoryKeyNameFormPageItem(data.type.title),
		[data.type.title]
	);

	return (
		<WideCardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any) => (
				<WideCard
					key={item._id}
					category={item[categoryKeyName]?.title}
					{...getThumbnailFromContent(item)}
					title={item.title}
					desc={item.text}
					creationDate={dateObjectFormatter(item.creationDate)}
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

export default HomeWideCards;
