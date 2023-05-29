import WideCard from "@/components/global/Card/WideCard";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import WideCardsRow from "@/components/global/PageItems/WideCardsRow";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	dateObjectFormatter,
	getCategoryKeyNameFormPageItem,
	getContentLikeEndpoint,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { webApiCatch } from "@/global/utils/webApiThen";
import { IPageItemConents } from "@my/types";
import { FC, useMemo, useState } from "react";

interface IHomeWideCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeWideCards: FC<IHomeWideCards> = ({
	data,
	greyBg,
}) => {
	const [, setFakeNumber] = useState(1);

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

	const handleContentLike = async (
		_id: string,
		index: number
	) => {
		await WebApiService.post(
			getContentLikeEndpoint(data.type.title, _id)
		)
			.then((res: any) => {
				data.content[index] = res.data;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

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
			items={data.content.map((item: any, index: number) => (
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
					isLiked={item.liked}
					isCommented={false}
					handleLike={() => handleContentLike(item._id, index)}
				/>
			))}
		/>
	);
};

export default HomeWideCards;
