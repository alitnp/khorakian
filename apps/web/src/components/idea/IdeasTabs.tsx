import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService from "@/global/utils/WebApiService";
import { Pagination, Segmented, Select } from "antd";
import { useRouter } from "next/router";
import {
	FC,
	useCallback,
	useEffect,
	useState,
	useMemo,
} from "react";
import queryString from "querystring";
import { ApiDataListResponse, IIdeaRead } from "@my/types";
import { webApiThen } from "@/global/utils/webApiThen";
import { SegmentedValue } from "antd/es/segmented";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { getAllIdeaCategories } from "@/redux/reducers/categories/getAllIdeaCategories";
import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import webRoutes from "@/global/constants/webRoutes";
import { handleIdeaLike } from "@/components/idea/ideaFunctions";

interface IIdeasTabs {}

const IdeasTabs: FC<IIdeasTabs> = ({}) => {
	//state
	const [list, setList] =
		useState<ApiDataListResponse<IIdeaRead>>();
	const { ideaCategoryList } = useSelector(
		(state: RootState) => state.categories
	);
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const { query, push, pathname, isReady } = useRouter();

	//effect
	useEffect(() => {
		if (isReady) {
			getList();
			!ideaCategoryList &&
				store.dispatch(getAllIdeaCategories());
		}
	}, [query, isReady]);

	//functions
	const getList = async () => {
		const { tab, ...props } = query;
		const payload: Record<string, any> = {
			...props,
			isApproved: true,
		};
		if (tab === "admin") payload.isAdminSubmitted = true;
		if (tab === "users") payload.isAdminSubmitted = false;

		setLoading(true);
		await WebApiService.get(
			webEndpointUrls.getApprovedIdeas +
				"?" +
				queryString.stringify(payload)
		)
			.then((res: ApiDataListResponse<IIdeaRead>) =>
				webApiThen({
					res,
					notifFail: false,
					notifSuccess: false,
					onSuccess: setList,
					onFailed: () => setList(undefined),
				})
			)
			.catch(() => setList(undefined));
		setLoading(false);
	};
	const handleTabChange = useCallback(
		(value: SegmentedValue) => {
			if (value === "admin")
				return push(
					pathname +
						"?" +
						queryString.stringify({
							tab: "admin",
							pageNumber: 1,
							pageSize: 50,
						})
				);
			if (value === "users")
				return push(
					pathname +
						"?" +
						queryString.stringify({
							tab: "users",
							pageNumber: 1,
							pageSize: 50,
						})
				);
			return push(
				pathname +
					"?" +
					queryString.stringify({ pageNumber: 1, pageSize: 50 })
			);
		},
		[]
	);
	const handleCategoryChange = (value: string) => {
		if (value === "all")
			return push(
				pathname +
					"?" +
					queryString.stringify({
						...query,
						ideaCategory: "",
					})
			);
		return push(
			pathname +
				"?" +
				queryString.stringify({
					...query,
					ideaCategory: value,
				})
		);
	};
	const handlePagination = (pageNumber = 1, pageSize = 50) =>
		push(
			pathname +
				"?" +
				queryString.stringify({
					...query,
					pageNumber,
					pageSize,
				})
		);

	//constants
	const categoryOptions = useMemo(() => {
		const defaultOption = {
			label: "همه",
			value: "all",
		};
		if (!ideaCategoryList) return [defaultOption];
		return [
			defaultOption,
			...ideaCategoryList.map((ic) => ({
				label: ic.title,
				value: ic._id,
			})),
		];
	}, [ideaCategoryList]);

	return (
		<div className="max-w-3xl mx-auto">
			<Segmented
				block
				value={(query?.tab as string) || "all"}
				onChange={handleTabChange}
				options={[
					{ label: "همه", value: "all" },
					{ label: "ادمین", value: "admin" },
					{ label: "کاربران", value: "users" },
				]}
			/>
			<div className="flex justify-end mt-4">
				<div className="">
					<label
						htmlFor="idea-category-select"
						className="text-sm text-k-grey-text-color"
					>
						دسته بندی :{" "}
					</label>
					<Select
						value={(query?.ideaCategory as string) || "all"}
						onChange={handleCategoryChange}
						size="small"
						id="idea-category-select"
						options={categoryOptions}
						className="w-32"
					/>
				</div>
			</div>
			<div className="py-6 space-y-4">
				{list?.data.map((idea) => (
					<TextOnlyCard
						category={idea.ideaCategory.title}
						commentCount={idea.commentCount}
						likeCount={idea.likeCount}
						isLiked={!!idea.liked}
						desc={idea.text}
						creationDate={dateObjectFormatter(idea.creationDate)}
						detailPath={
							webRoutes.ideaDetail.path + "/" + idea._id
						}
						isCommented={false}
						title={idea.title}
						viewCount={idea.viewCount}
						key={idea._id}
						fullWidth
						handleLike={() => handleIdeaLike(idea._id, getList)}
					/>
				))}
			</div>
			{list && list.totalPages > 1 && (
				<div className="flex justify-center my-6">
					<Pagination
						current={list.pageNumber}
						pageSize={list.pageSize}
						total={list.totalItems}
						onChange={handlePagination}
						hideOnSinglePage
					/>
				</div>
			)}
		</div>
	);
};

export default IdeasTabs;
