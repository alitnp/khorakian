import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import EditUserIdea from "@/components/dashboard/dashboardIdea/EditUserIdea";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import Loading from "@/components/global/Loading/Loading";
import webRoutes from "@/global/constants/webRoutes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { ApiDataResponse, IIdeaRead } from "@my/types";
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
import ContentDetailSlider from "@/components/global/Slider/ContentDetailSlider";

const DashboardIdeaDetail: FC = () => {
	//state
	const [detail, setDetail] = useState<IIdeaRead>();
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
		await WebApiService.get(webEndpointUrls.ideaDetail(_id))
			.then((res: ApiDataResponse<IIdeaRead>) => {
				if (res.isSuccess) setDetail(res.data);
			})
			.catch(() => {});
		setLoading(false);
	};
	const handleDelete = async () => {
		setLoading(true);
		await WebApiService.delete(
			webEndpointUrls.ideaEdit(query._id as string)
		)
			.then((res: any) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => push(webRoutes.dashboardIdea.path),
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<DashboardLayout>
			<DashboardPageTitle
				title="ایده های من"
				moreContent={
					<div className="flex gap-2">
						{!detail?.isApprove && (
							<>
								<span
									className="text-sm font-normal cursor-pointer text-k-secondary-color"
									onClick={toggleEditModal}
								>
									<BiEdit className="inline ml-1" />
									ویرایش
								</span>
								<Popconfirm
									title="حذف شود؟"
									onConfirm={handleDelete}
								>
									<span className="text-sm font-normal cursor-pointer text-k-error-color">
										<AiOutlineDelete className="inline ml-1" />
										حذف
									</span>
								</Popconfirm>
							</>
						)}
					</div>
				}
			/>
			{detail && (
				<div className="grid w-full grid-cols-1">
					<ContentDetailSlider
						images={detail?.images || []}
						videos={detail?.videos || []}
					/>
					<div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
						<div>
							<h1 className="text-xl font-bold">{detail.title}</h1>
							<span className="text-sm text-k-grey-text-color">
								{detail.ideaCategory.title}
							</span>
						</div>
						<div className="w-full sm:max-w-[200px] p-2 text-xs border rounded-lg bg-k-grey-bg-1-color border-k-border-2-color">
							در صورت تایید ادمین مطلب در سامانه منتشر خواهد شد.
							<br />
							توجه داشته باشید پس از تایید و انتشار، امکان ویرایش
							یا حذف وجود نخواهد داشت.
						</div>
					</div>
					<p className="my-6">{detail.text}</p>
				</div>
			)}
			{loading && <Loading />}
			{detail && (
				<EditUserIdea
					close={toggleEditModal}
					refetch={getDetail}
					idea={detail}
					visible={showEditModal}
				/>
			)}
		</DashboardLayout>
	);
};

export default DashboardIdeaDetail;
