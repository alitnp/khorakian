import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
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
	IUserExperienceRead,
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

interface IDashboardExperienceList {
	list: ApiDataListResponse<IUserExperienceRead>;
	refetch: (
		_pageNumber?: number,
		_pageSize?: number,
		_isApproved?: boolean
	) => void;
}

const DashboardExperienceList: FC<
	IDashboardExperienceList
> = ({ list, refetch }) => {
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
	const handleLike = async (_id: string) => {
		await WebApiService.post(
			webEndpointUrls.userExperienceLike + "/" + _id
		)
			.then((res: ApiDataResponse<IUserExperienceRead>) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: false,
					onSuccess: () => refetch(),
					dataOnly: true,
				})
			)
			.catch(() => webApiCatch(errorResponse));
	};

	//constants
	const renderList = useMemo(() => {
		if (list.data.length === 0)
			return (
				<div className="flex items-center justify-center w-full mt-4 text-sm border border-dashed py-14 col-span-full">
					موردی ثبت نشده.
				</div>
			);
		return list.data.map((exp) => (
			<div className="" key={exp._id}>
				{exp.isApprove && (
					<span className="text-xs text-k-success-color">
						<BiCheck className="inline" />
						توسط ادمین تایید و در سایت منتشر شده.
					</span>
				)}
				<TextOnlyCard
					category={exp.experienceCategory.title}
					commentCount={exp.commentCount}
					creationDate={dateObjectFormatter(exp.creationDate)}
					desc={exp.text}
					detailPath={
						webRoutes.dashboardExperience.path + "/" + exp._id
					}
					title={exp.title}
					likeCount={exp.likeCount}
					viewCount={exp.viewCount}
					isLiked={!!exp.liked}
					isCommented={false}
					handleLike={() => handleLike(exp._id)}
					user={exp?.user}
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

export default memo(DashboardExperienceList);
