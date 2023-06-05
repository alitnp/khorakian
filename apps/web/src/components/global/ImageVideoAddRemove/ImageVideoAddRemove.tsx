import webConfig from "@/global/constants/webConfig";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import {
	ApiDataResponse,
	IImage,
	IVideoRead,
} from "@my/types";
import { Button, FormInstance, Popconfirm } from "antd";
import Image from "next/image";
import { ChangeEvent, FC, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";

interface IImageVideoAddRemove {
	images: IImage[];
	setImages: (_images: IImage[]) => void;
	videos: IVideoRead[];
	setVideos: (_videos: IVideoRead[]) => void;
	setImageLoading: (_loading: boolean) => void;
	setVideoLoading: (_loading: boolean) => void;
	form: FormInstance<any>;
}

const ImageVideoAddRemove: FC<IImageVideoAddRemove> = ({
	images,
	setImages,
	videos,
	setVideos,
	setImageLoading,
	setVideoLoading,
	form,
}) => {
	//ref
	const imageInput = useRef<HTMLInputElement | null>(null);
	const videoInput = useRef<HTMLInputElement | null>(null);

	//functions
	const handleDeleteImage = async (id: string) => {
		setImages(images.filter((i) => i._id !== id));
	};
	const handleDeleteVideo = async (id: string) => {
		setVideos(videos.filter((v) => v._id !== id));
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
					onSuccessData: (data) => setImages([...images, data]),
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
					onSuccessData: (data) => setVideos([...videos, data]),
					notifFail: true,
					notifSuccess: true,
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setVideoLoading(false);
	};

	return (
		<>
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
		</>
	);
};

export default ImageVideoAddRemove;
