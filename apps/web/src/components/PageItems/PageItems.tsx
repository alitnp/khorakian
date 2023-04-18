"use client";

import Card from "@/components/Card/Card";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";

interface IPageItems {}

const PageItems: FC<IPageItems> = ({}) => {
	const ref2 =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref2, {
		applyRubberBandEffect: true,
		decayRate: 0.96,
	});

	return (
		<div className="py-14 k-container">
			<div className="flex justify-between border-b">
				<div>
					<h3 className="text-3xl font-bold">تازه ها</h3>
					<span className="text-sm">
						آخرین محتوای اضافه شده به سامانه
					</span>
				</div>
				<div className="flex items-center gap-2 cursor-pointer text-k-primary-color hover:text-k-primary-2-color">
					<span>۱۴ مورد دیگر</span>
					<BiArrowBack className="text-xl" />
				</div>
			</div>
			<div
				className="overflow-x-scroll scrollbar-hide no-scroll"
				ref={ref2}
				{...events}
			>
				<div className="flex px-2 py-6 gap-x-6">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, idx) => (
						<Card key={idx} />
					))}
				</div>
			</div>

			{/* <div className="flex w-full gap-10 py-6 overflow-x-auto">
				<Card />
				<Card />
				<Card />
				<Card />
				<WideCard />
				<Card />
				<Card />
				<Card />
				<Card />
				<WideCard />
			</div> */}
		</div>
	);
};

export default PageItems;
