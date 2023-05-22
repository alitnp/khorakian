import { Spin } from "antd";
import { FC } from "react";

interface ITcCoverLoading {
	text?: string;
}

const Loading: FC<ITcCoverLoading> = ({ text }) => {
	return (
		<div className="absolute top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full overflow-hidden text-xs border shadow-md border-t-border-color-base backdrop-filter backdrop-blur-sm ">
			<Spin />
			{text}
		</div>
	);
};

export default Loading;
