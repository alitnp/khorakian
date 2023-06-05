import MyButton from "@/components/basicUi/MyButton";
import Loading from "@/components/global/Loading/Loading";
import ReduxSelect from "@/components/global/ReduxSelect/ReduxSelect";
import webConfig from "@/global/constants/webConfig";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import { getAllIdeaCategories } from "@/redux/reducers/categories/getAllIdeaCategories";
import {
	ApiDataResponse,
	IImage,
	IUserExperience,
	IVideoRead,
} from "@my/types";
import {
	Button,
	Form,
	Input,
	Modal,
	Popconfirm,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";

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
	const { push } = useRouter();

	//ref
	const imageInput = useRef<HTMLInputElement | null>(null);
	const videoInput = useRef<HTMLInputElement | null>(null);

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
	const handleImageSelect = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const files = e.target.files;
		if (!files) return;
		const file = files[0];
		const formData = new FormData();
		formData.append("image", file);
		formData.append("title", form.getFieldValue("title"));
		setImageLoading(true);
		await WebApiService.post(
			webEndpointUrls.imageUpload,
			formData
		)
			.then((res: ApiDataResponse<IImage>) =>
				webApiThenGeneric<ApiDataResponse<IImage>, IImage>({
					res,
					onSuccessData: (data) =>
						setImages((prevState) => [...prevState, data]),
					notifFail: true,
					notifSuccess: true,
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setImageLoading(false);
	};
	const handleVideoSelect = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const files = e.target.files;
		if (!files) return;
		const file = files[0];
		const formData = new FormData();
		formData.append("video", file);
		formData.append("title", form.getFieldValue("title"));
		setVideoLoading(true);
		await WebApiService.post(
			webEndpointUrls.videoUpload,
			formData
		)
			.then((res: ApiDataResponse<IVideoRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IVideoRead>,
					IVideoRead
				>({
					res,
					onSuccessData: (data) =>
						setVideos((prevState) => [...prevState, data]),
					notifFail: true,
					notifSuccess: true,
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setVideoLoading(false);
	};
	const handleDeleteImage = async (id: string) => {
		setImages(images.filter((i) => i._id !== id));
	};
	const handleDeleteVideo = async (id: string) => {
		setVideos(videos.filter((v) => v._id !== id));
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
				<div className="mb-6">
					<span className="block mb-2 font-medium">محتوا</span>
					<div className="flex gap-4">
						<Button
							className="w-full"
							onClick={() => imageInput?.current?.click()}
						>
							بارگزاری عکس
						</Button>
						<Button
							className="w-full"
							onClick={() => videoInput?.current?.click()}
						>
							بارگزاری ویدیو
						</Button>
					</div>
					<input
						type="file"
						accept="image/*"
						ref={imageInput}
						className="hidden"
						onChange={handleImageSelect}
						multiple={false}
					/>
					<input
						type="file"
						accept="video/*"
						ref={videoInput}
						className="hidden"
						multiple={false}
						onChange={handleVideoSelect}
					/>
				</div>
				<div className="flex gap-4 mb-6 overflow-x-auto overflow-y-hidden">
					{images.map((img) => {
						if (!img.thumbnailPathname) return <></>;
						return (
							<div
								className="flex flex-col items-center"
								key={img._id}
							>
								<div className="overflow-hidden rounded-lg w-fit">
									<Image
										src={webConfig.domain + img.thumbnailPathname}
										alt={img.title}
										width={img.thumbnailWidth}
										height={80}
										className="object-contain h-20 w-fit"
									/>
								</div>
								<Popconfirm
									title="حذف شود؟"
									onConfirm={() => handleDeleteImage(img._id)}
								>
									<span className="text-sm font-normal cursor-pointer text-k-error-color">
										<AiOutlineDelete className="inline ml-1" />
										حذف
									</span>
								</Popconfirm>
							</div>
						);
					})}
					{videos.map((vid) => {
						return (
							<div
								key={vid._id}
								className="relative overflow-hidden rounded-lg w-fit"
							>
								<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-k-bg-color">
									<BsPlayCircle className="text-4xl" />
								</div>
								<video
									src={
										webConfig.domain +
										vid.qualityVariations[0].pathname
									}
									height={80}
									className="object-contain h-20 w-fit"
								/>
								<Popconfirm
									title="حذف شود؟"
									onConfirm={() => handleDeleteVideo(vid._id)}
								>
									<span className="text-sm font-normal cursor-pointer text-k-error-color">
										<AiOutlineDelete className="inline ml-1" />
										حذف
									</span>
								</Popconfirm>
							</div>
						);
					})}
				</div>
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
