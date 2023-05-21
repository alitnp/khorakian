import Card from "@/components/global/Card/Card";
import CardsRow from "@/components/global/PageItems/CardsRow";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import {
	dateObjectFormatter,
	getCategoryKeyNameFormPageItem,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { IPageItemConents } from "@my/types";
import { FC, useMemo } from "react";

interface IHomeCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeCards: FC<IHomeCards> = ({ data, greyBg }) => {
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
		<CardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any) => (
				<Card
					key={item._id}
					category={item[categoryKeyName]?.title}
					{...getThumbnailFromContent(item)}
					title={item.title}
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

export default HomeCards;
