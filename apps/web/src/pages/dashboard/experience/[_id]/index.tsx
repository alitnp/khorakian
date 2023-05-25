import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import EditUserExperience from "@/components/dashboard/dashboardExperience/EditUserExperience";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import Loading from "@/components/global/Loading/Loading";
import webRoutes from "@/global/constants/routes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import {
	ApiDataResponse,
	IUserExperienceRead,
} from "@my/types";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";
import {
	FC,
	useCallback,
	useEffect,
	useState,
} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const DashboardExperienceDetail: FC = () => {
	//state
	const [detail, setDetail] =
		useState<IUserExperienceRead>();
	const [loading, setLoading] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] =
		useState<boolean>(false);

	//hooks
	const { query, isReady, push } = useRouter();

	//effects
	useEffect(() => {
		isReady && query._id && getDetail(query._id as string);
	}, [isReady]);

	//functions
	const toggleEditModal = useCallback(
		() => setShowEditModal((prevState) => !prevState),
		[]
	);
	const getDetail = async (_id: string) => {
		setLoading(true);
		await WebApiService.get(
			webEndpointUrls.userExperienceDetail(_id)
		)
			.then((res: ApiDataResponse<IUserExperienceRead>) => {
				if (res.isSuccess) setDetail(res.data);
			})
			.catch(() => {});
		setLoading(false);
	};
	const handleDelete = async () => {
		setLoading(true);
		await WebApiService.delete(
			webEndpointUrls.userExperienceDelete(query._id as string)
		)
			.then((res: any) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () =>
						push(webRoutes.dashboardExperience.path),
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<DashboardLayout>
			<DashboardPageTitle
				title="تجربیات من"
				moreContent={
					<div className="flex gap-2">
						{!detail?.isApprove && (
							<span
								className="text-sm font-normal cursor-pointer text-k-secondary-color"
								onClick={toggleEditModal}
							>
								<BiEdit className="inline ml-1" />
								ویرایش
							</span>
						)}
						<Popconfirm title="حذف شود؟" onConfirm={handleDelete}>
							<span className="text-sm font-normal cursor-pointer text-k-error-color">
								<AiOutlineDelete className="inline ml-1" />
								حذف
							</span>
						</Popconfirm>
					</div>
				}
			/>
			{detail && (
				<div>
					<div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
						<div>
							<h1 className="text-xl font-bold">{detail.title}</h1>
							<span className="text-sm text-k-grey-text-color">
								{detail.experienceCategory.title}
							</span>
						</div>
						<CardLikeCommentCount
							commentCount={detail.commentCount}
							likeCount={detail.likeCount}
							viewCount={detail.viewCount}
						/>
					</div>
					<p className="my-6">{detail.text}</p>
				</div>
			)}
			{loading && <Loading />}
			{detail && (
				<EditUserExperience
					close={toggleEditModal}
					refetch={getDetail}
					userExperience={detail}
					visible={showEditModal}
				/>
			)}
		</DashboardLayout>
	);
};

export default DashboardExperienceDetail;
