import Card from "@/components/Card/Card";
import WideCard from "@/components/Card/WideCard";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IPageItems {}

const PageItems: FC<IPageItems> = ({}) => {
	return (
		<div>
			<div className="flex justify-between border-b">
				<div>
					<h3 className="text-2xl font-black">تازه ها</h3>
					<span>آخرین محتوای اضافه شده به سامانه</span>
				</div>
				<div className="flex items-center gap-2 cursor-pointer text-k-primary-color hover:text-k-primary-2-color">
					<span>۱۴ مورد دیگر</span>
					<BiArrowBack className="text-xl" />
				</div>
			</div>
			<div className="gap-4 my-6 ">
				<WideCard />
				<Card />
				<WideCard />
				<Card />
				<WideCard />
				<Card />
				<WideCard />
				<Card />
			</div>
		</div>
	);
};

export default PageItems;
