import ImageOnlyCard from "@/components/global/Card/ImageOnlyCard";
import ImageOnlyCardsRow from "@/components/global/PageItems/ImageOnlyCardsRow";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	getContentLikeEndpoint,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { webApiCatch } from "@/global/utils/webApiThen";
import { IPageItemConents } from "@my/types";
import { FC, useMemo, useState } from "react";

interface IHomeImageOnlyCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeImageOnlyCards: FC<IHomeImageOnlyCards> = ({
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
		<ImageOnlyCardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any, index: number) => (
				<ImageOnlyCard
					key={item._id}
					{...getThumbnailFromContent(item)}
					title={item.title}
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

export default HomeImageOnlyCards;
