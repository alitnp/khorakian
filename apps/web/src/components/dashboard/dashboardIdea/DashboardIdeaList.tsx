import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import { handleIdeaLike } from "@/components/idea/ideaFunctions";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import webRoutes from "@/global/constants/webRoutes";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import {
	ApiDataListResponse,
	ApiDataResponse,
	IIdeaRead,
} from "@my/types";
import { Checkbox, Pagination, Tooltip } from "antd";
import {
	FC,
	memo,
	useMemo,
	useCallback,
	useState,
	useEffect,
} from "react";
import { BiCheck } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";

interface IDashboardIdeaList {
	list: ApiDataListResponse<IIdeaRead>;
	refetch: (
		_pageNumber?: number,
		_pageSize?: number,
		_isApproved?: boolean
	) => void;
}

const DashboardIdeaList: FC<IDashboardIdeaList> = ({
	list,
	refetch,
}) => {
	//states
	const [onlyApproved, setOnlyApproved] =
		useState<boolean>(false);

	//effect
	useEffect(() => {
		refetch(1, 24, onlyApproved ? true : undefined);
	}, [onlyApproved]);

	//functions
	const handlePagination = useCallback(
		(pageNumber?: number, pageSize?: number) =>
			refetch(pageNumber, pageSize, onlyApproved),
		[]
	);

	//constants
	const renderList = useMemo(() => {
		if (list.data.length === 0)
			return (
				<div className="flex items-center justify-center w-full mt-4 text-sm border border-dashed py-14 col-span-full">
					موردی ثبت نشده.
				</div>
			);
		return list.data.map((idea) => (
			<div className="" key={idea._id}>
				{idea.isApprove && (
					<span className="text-xs text-k-success-color">
						<BiCheck className="inline" />
						توسط ادمین تایید و در سایت منتشر شده.
					</span>
				)}
				<TextOnlyCard
					category={idea.ideaCategory.title}
					commentCount={idea.commentCount}
					creationDate={dateObjectFormatter(idea.creationDate)}
					desc={idea.text}
					detailPath={
						webRoutes.dashboardIdea.path + "/" + idea._id
					}
					title={idea.title}
					likeCount={idea.likeCount}
					viewCount={idea.viewCount}
					isLiked={!!idea.liked}
					isCommented={false}
					handleLike={() => handleIdeaLike(idea._id, refetch)}
				/>
			</div>
		));
	}, [list]);

	return (
		<div>
			<div className="flex items-center justify-end gap-2 mb-2">
				<label
					htmlFor="only-approved-experiences"
					className="text-sm cursor-pointer"
				>
					<Tooltip
						title="تمام تجربیات ثبت شده توسط ادمین بررسی و در صورت تایید
						در سامانه منتشر می شود تا با دیگر کاربران اشتراک گذاری
						و مورد بحث گفتگو قرار گیرد."
					>
						<BsQuestionCircle className="inline ml-1 text-k-grey-text-color" />
					</Tooltip>
					نمایش تایید شده ها
				</label>
				<Checkbox
					id="only-approved-experiences"
					checked={onlyApproved}
					onChange={(e) => setOnlyApproved(e.target.checked)}
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{renderList}
			</div>
			<div className="flex justify-center mt-6">
				<Pagination
					current={list.pageNumber}
					pageSize={list.pageSize}
					total={list.totalItems}
					onChange={handlePagination}
					hideOnSinglePage
				/>
			</div>
		</div>
	);
};

export default memo(DashboardIdeaList);
