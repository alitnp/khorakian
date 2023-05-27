import { FC, ReactNode } from "react";
import Masonry, { MasonryProps } from "react-masonry-css";

interface IMyMasonry
	extends Omit<MasonryProps, "className"> {
	children: ReactNode;
}

const MyMasonry: FC<IMyMasonry> = ({
	children,
	...props
}) => {
	return (
		<Masonry
			breakpointCols={{
				default: 5,
				1600: 4,
				1100: 3,
				768: 2,
				500: 1,
			}}
			{...props}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{children}
		</Masonry>
	);
};

export default MyMasonry;
