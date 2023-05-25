import { FC, ReactNode } from "react";

interface IDashboardPageTitle {
	title: string;
	moreContent?: ReactNode;
}

const DashboardPageTitle: FC<IDashboardPageTitle> = ({
	title,
	moreContent,
}) => {
	return (
		<h1 className="flex flex-col justify-between w-full gap-2 pb-2 mb-4 font-medium border-b sm:items-center sm:flex-row">
			{title}
			{moreContent && moreContent}
		</h1>
	);
};

export default DashboardPageTitle;
