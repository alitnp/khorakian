import { GetStaticProps } from "next";
import {
	ApiDataListResponse,
	IExperienceWithComments,
	IUserExperienceRead,
} from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo, useEffect, useMemo, useState } from "react";

import { getExperienceListWithComments } from "@/components/experience/experienceFunctions";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { useRouter } from "next/router";
import WebApiService from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import queryString from "querystring";
import { getAllExperienceCategories } from "@/redux/reducers/categories/getAllExperienceCategories";
import { webApiThen } from "@/global/utils/webApiThen";
import UserExperienceBrief from "@/components/userExperience/UserExperienceBrief";
import { Pagination, Select } from "antd";

type props = {
	experience: ApiDataListResponse<IExperienceWithComments>;
};

export const getStaticProps: GetStaticProps = async () => {
	const experience = await getExperienceListWithComments();

	const props: props = {
		experience,
	};

	return {
		props,
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Experience = ({ experience }: props) => {
	//state
	const [list, setList] =
		useState<ApiDataListResponse<IUserExperienceRead>>();
	const { experienceCategoryList } = useSelector(
		(state: RootState) => state.categories
	);
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const { query, push, pathname, isReady } = useRouter();

	//effect
	useEffect(() => {
		if (isReady) {
			getList();
			!experienceCategoryList &&
				store.dispatch(getAllExperienceCategories());
		}
	}, [query, isReady]);

	//functions
	const getList = async () => {
		const payload: Record<string, any> = {
			...query,
			isApproved: true,
		};

		setLoading(true);
		await WebApiService.get(
			webEndpointUrls.getApprovedUserExperience +
				"?" +
				queryString.stringify(payload)
		)
			.then((res: ApiDataListResponse<IUserExperienceRead>) =>
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
	const handleCategoryChange = (value: string) => {
		if (value === "all")
			return push(
				pathname +
					"?" +
					queryString.stringify({
						...query,
						experienceCategory: "",
					})
			);
		return push(
			pathname +
				"?" +
				queryString.stringify({
					...query,
					experienceCategory: value,
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
		if (!experienceCategoryList) return [defaultOption];
		return [
			defaultOption,
			...experienceCategoryList.map((ec) => ({
				label: ec.title,
				value: ec._id,
			})),
		];
	}, [experienceCategoryList]);

	return (
		<main>
			<div className="relative h-[30rem] flex items-center justify-center w-full ">
				<div className="relative flex flex-col items-center content-center ">
					<div
						className="mx-auto mt-5 text-center"
						style={{ width: "60%" }}
					>
						<h1 className="text-4xl font-bold">
							تجربیات ثبت شده توسط کاربران
						</h1>
					</div>
				</div>
			</div>

			<div className="flex flex-col max-w-5xl gap-4 mx-auto mt-6 md:flex-row k-container">
				<div className="flex flex-col justify-between w-full p-4 border rounded-lg">
					<h5 className="font-medium">تجربیات امیر خوراکیان</h5>
					<span className="text-sm text-k-grey-text-color">
						تا کنون {experience.totalItems} تجربه توسط امیر
						خوراکیان سامانه ثبت شده و مورد بحث و گفتگو قرار گرفته.
					</span>
					<Link
						href={webRoutes.experienceAllContent.path}
						className="mt-2 text-sm text-k-primary-color"
					>
						نمایش همه تجربیات امیر خوراکیان
					</Link>
				</div>
			</div>
			<div className="max-w-5xl mx-auto k-container">
				<div className="flex justify-between pb-6 mt-10 border-b border-k-border-2-color">
					<h1 className="text-base font-medium">
						آخرین تجربیات ثبت شده توسط کاربران
					</h1>
					<div className="flex justify-end mt-4">
						<div className="">
							<label
								htmlFor="idea-category-select"
								className="text-sm text-k-grey-text-color"
							>
								دسته بندی :{" "}
							</label>
							<Select
								value={
									(query?.experienceCategory as string) || "all"
								}
								onChange={handleCategoryChange}
								size="small"
								id="idea-category-select"
								options={categoryOptions}
								className="w-32"
							/>
						</div>
					</div>
				</div>
				{list?.data.map((item) => (
					<UserExperienceBrief
						key={item._id}
						experience={item}
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
		</main>
	);
};

export default memo(Experience);
