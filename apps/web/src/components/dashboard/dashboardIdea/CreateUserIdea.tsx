import MyButton from "@/components/basicUi/MyButton";
import Loading from "@/components/global/Loading/Loading";
import ReduxSelect from "@/components/global/ReduxSelect/ReduxSelect";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { getAllIdeaCategories } from "@/redux/reducers/categories/getAllIdeaCategories";
import {
	ApiDataResponse,
	IImage,
	IUserExperience,
	IVideoRead,
} from "@my/types";
import { Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import ImageVideoAddRemove from "@/components/global/ImageVideoAddRemove/ImageVideoAddRemove";

interface ICreateUserIdea {
	visible: boolean;
	close: () => void;
	refetch: () => void;
}

const CreateUserIdea: FC<ICreateUserIdea> = ({
	visible,
	close,
	refetch,
}) => {
	//state
	const [loading, setLoading] = useState<boolean>(false);
	const [images, setImages] = useState<IImage[]>([]);
	const [videos, setVideos] = useState<IVideoRead[]>([]);
	const [imageLoading, setImageLoading] =
		useState<boolean>(false);
	const [videoLoading, setVideoLoading] =
		useState<boolean>(false);

	//hooks
	const [form] = Form.useForm();

	//functions
	const handleSubmit = async (values: any) => {
		setLoading(true);
		await WebApiService.post(webEndpointUrls.ideaCreate, {
			...values,
			videos: videos.map((vid) => vid._id),
			images: images.map((img) => img._id),
		})
			.then((res: ApiDataResponse<IUserExperience>) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => {
						refetch();
						close();
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<Modal
			open={visible}
			onCancel={
				!loading && !imageLoading && !videoLoading
					? close
					: () => {}
			}
			footer={false}
			title="ثبت ایده من"
		>
			<div className="pt-6">
				<ImageVideoAddRemove
					images={images}
					setImages={setImages}
					videos={videos}
					setVideos={setVideos}
					form={form}
					setImageLoading={setImageLoading}
					setVideoLoading={setVideoLoading}
				/>
				<Form
					form={form}
					onFinish={handleSubmit}
					requiredMark={false}
					layout="vertical"
				>
					<Form.Item
						name="title"
						label="عنوان"
						rules={[
							{
								required: true,
								message: "عنوان ایده وارد نشده.",
							},
						]}
					>
						<Input placeholder="عنوان" />
					</Form.Item>
					<Form.Item
						name="ideaCategory"
						label="دسته بندی"
						rules={[
							{
								required: true,
								message: "دسته بندی تعیین نشده.",
							},
						]}
					>
						<ReduxSelect
							reducerName="categories"
							reducerListProperty="ideaCategoryList"
							getlist={getAllIdeaCategories}
						/>
					</Form.Item>
					<Form.Item
						name="text"
						label="شرح"
						rules={[
							{
								required: true,
								message: "شرح ایده وارد نشده.",
							},
						]}
					>
						<Input.TextArea placeholder="شرح" rows={5} />
					</Form.Item>
					<p className="mt-4">
						<BiInfoCircle className="inline" /> توجه داشته باشید،
						تمام ایده های ثبت شده توسط ادمین بررسی و در صورت تایید
						در سامانه منتشر می شود تا با دیگر کاربران اشتراک گذاری
						و مورد بحث گفتگو قرار گیرد.
					</p>
					<div className="flex justify-end mt-6">
						<MyButton type="primary" htmlType="submit">
							ثبت
						</MyButton>
					</div>
				</Form>
			</div>
			{loading && <Loading />}
			{imageLoading && <Loading text="درحال بارگزاری عکس" />}
			{videoLoading && <Loading text="درحال بارگزاری ویدیو" />}
		</Modal>
	);
};

export default CreateUserIdea;
