import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import TextOnlyCardsRow from "@/components/global/PageItems/TextOnlyCardsRow";
import {
	dateObjectFormatter,
	getCategoryKeyNameFormPageItem,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
} from "@/global/utils/helperFunctions";
import { IPageItemConents } from "@my/types";
import { FC, useMemo } from "react";

interface IHomeTextOnlyCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeTextOnlyCards: FC<IHomeTextOnlyCards> = ({
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
		<TextOnlyCardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any) => (
				<TextOnlyCard
					key={item._id}
					category={item[categoryKeyName]?.title}
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

export default HomeTextOnlyCards;
