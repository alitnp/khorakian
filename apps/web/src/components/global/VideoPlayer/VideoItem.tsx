import { IVideoRead } from "@my/types";
import {
	FC,
	memo,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";
import { PlayCircleTwoTone } from "@ant-design/icons";
import webConfig from "@/global/constants/webConfig";
import { Select } from "antd";

interface IVideoItem {
	video: IVideoRead;
	size?: "small" | "normal" | "full";
	imageOnly?: boolean;
}

type videoSrc = { pathname: string; label: number };

const VideoItem: FC<IVideoItem> = ({
	video,
	size = "normal",
	imageOnly,
}) => {
	//state
	const [srcs, setSrcs] = useState<videoSrc[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [selectOpen, setSelectOpen] =
		useState<boolean>(false);

	//hooks
	const videoPlayer = useRef<HTMLVideoElement>(null);

	//effect
	useEffect(() => {
		if (video) {
			const videoSrcs: videoSrc[] = video.qualityVariations
				.map((q) => ({
					pathname: webConfig.baseUrl + q.pathname,
					label: +q.size,
				}))
				.sort((a, b) => {
					if (a.label > b.label) return -1;
					if (a.label < b.label) return 1;
					return 0;
				});
			setSrcs(videoSrcs);
		}
	}, [video]);

	//functions
	const handleSizeChange = useCallback((e: number) => {
		const currentTime = videoPlayer.current?.currentTime || 0;
		const volume = videoPlayer.current?.volume || 1;
		const muted = videoPlayer.current?.muted || false;
		setActiveIndex(e);
		setTimeout(() => {
			if (videoPlayer.current !== null) {
				videoPlayer.current.currentTime = currentTime;
				videoPlayer.current.volume = volume;
				videoPlayer.current.muted = muted;
			}
			videoPlayer.current?.play();
		}, 1000);
	}, []);

	return (
		<div
			className={`relative ${size === "normal" && "w-80"} ${
				size === "small" && "w-40"
			} ${
				size === "full" &&
				"h-[300px] md:h-[500px] max-h-[80vh] w-full"
			}`}
		>
			{imageOnly && (
				<div className="absolute top-0 left-0 z-50 w-full h-full pointer-events-none select-none" />
			)}
			<div
				className={`relative flex items-center  overflow-hidden bg-black rounded-xl aspect-video group ${
					size === "normal" && "w-80"
				} ${size === "small" && "w-40"} ${
					size === "full" &&
					"h-[300px] md:h-[500px] max-h-[80vh] w-full"
				}`}
			>
				{srcs.length > 0 && webConfig.domain && (
					<video
						poster={
							video.thumbnail &&
							webConfig.domain + video.thumbnail.thumbnailPathname
						}
						controlsList="nodownload"
						disablePictureInPicture
						controls={!imageOnly}
						className="w-full h-full "
						ref={videoPlayer}
						key={srcs[activeIndex].pathname}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
					>
						<source
							src={srcs[activeIndex].pathname}
							type="video/mp4"
						/>{" "}
					</video>
				)}
				{!isPlaying && (
					<div
						className="absolute -translate-x-1/2 -translate-y-1/2 inherit-color top-1/2 left-1/2"
						onClick={() => {
							if (imageOnly) return;
							setIsPlaying(true);
							if (videoPlayer.current !== null)
								videoPlayer.current.play();
						}}
					>
						<PlayCircleTwoTone
							className={`${!imageOnly && "cursor-pointer"} ${
								size === "small" ? "text-3xl" : "text-5xl"
							}`}
						/>
					</div>
				)}

				{srcs.length > 0 && !imageOnly && (
					<div className="absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100 hover:opacity-100">
						<Select
							options={srcs.map((src, index) => ({
								label: src.label,
								value: index,
							}))}
							value={activeIndex}
							onChange={handleSizeChange}
							size="small"
							open={selectOpen}
							onFocus={() => setSelectOpen(true)}
							onBlur={() => setSelectOpen(false)}
							onSelect={() => setSelectOpen(false)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(VideoItem);
