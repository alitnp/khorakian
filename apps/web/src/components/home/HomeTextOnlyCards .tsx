import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import TextOnlyCardsRow from "@/components/global/PageItems/TextOnlyCardsRow";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	dateObjectFormatter,
	getCategoryKeyNameFormPageItem,
	getContentLikeEndpoint,
	getDetailPathnameforPageItem,
	getMoreUrlPathFromPageItem,
} from "@/global/utils/helperFunctions";
import { webApiCatch } from "@/global/utils/webApiThen";
import { IPageItemConents } from "@my/types";
import { FC, useMemo, useState } from "react";

interface IHomeTextOnlyCards {
	data: IPageItemConents;
	greyBg: boolean;
}

const HomeTextOnlyCards: FC<IHomeTextOnlyCards> = ({
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
		<TextOnlyCardsRow
			greyBg={greyBg}
			title={
				<PageItemTitle
					title={data.title}
					desc={data.subTitle}
					moreUrl={moreUrl}
				/>
			}
			items={data.content.map((item: any, index: number) => (
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
					isLiked={item.liked}
					isCommented={false}
					handleLike={() => handleContentLike(item._id, index)}
					user={
						(categoryKeyName === "ideaCategory" ||
							categoryKeyName === "experienceCategory") &&
						item?.user
					}
				/>
			))}
		/>
	);
};

export default HomeTextOnlyCards;
