import Image from "next/image";
import { FC } from "react";

interface ICard {}

const Card: FC<ICard> = ({}) => {
	return (
		<article className="overflow-hidden rounded-md shadow-md">
			<Image
				src="/image.png"
				width={200}
				height={200}
				alt="sdfgsdfg "
			/>
			<span>آلبوم</span>
			<h2>مراسم پیاده روی اربعین</h2>
		</article>
	);
};

export default Card;
