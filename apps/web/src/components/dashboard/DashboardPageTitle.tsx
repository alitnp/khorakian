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
		<h1 className="flex items-center justify-between w-full pb-2 font-medium border-b">
			{title}
			{moreContent && moreContent}
		</h1>
	);
};

export default DashboardPageTitle;
