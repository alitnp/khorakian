import React, { FC, useState } from "react";
import ReactPlayer from "react-player";

interface IVideoPlayer {
	urls: string[];
}

const VideoPlayer: FC<IVideoPlayer> = ({ urls }) => {
	const [selectedUrl, setSelectedUrl] = useState<string>(
		urls[0]
	);
	const [playedSeconds, setPlayedSeconds] =
		useState<number>(0);

	const handleProgress = ({
		playedSeconds,
	}: {
		playedSeconds: number;
	}) => {
		setPlayedSeconds(playedSeconds);
	};

	const handleUrlChange = (url: string) => {
		setSelectedUrl(url);
	};

	return (
		<div>
			<ReactPlayer
				url={selectedUrl}
				controls
				width="100%"
				height="auto"
				onProgress={handleProgress}
				seekTo={playedSeconds}
			/>
			<div>
				{urls.map((url) => (
					<button key={url} onClick={() => handleUrlChange(url)}>
						{url}
					</button>
				))}
			</div>
			<div>Selected URL: {selectedUrl}</div>
		</div>
	);
};

export default VideoPlayer;
