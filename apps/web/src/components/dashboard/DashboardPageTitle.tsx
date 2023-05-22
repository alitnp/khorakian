import { FC } from "react";

interface IDashboardPageTitle {
	title: string;
}

const DashboardPageTitle: FC<IDashboardPageTitle> = ({
	title,
}) => {
	return (
		<h1 className="w-full pb-2 font-medium border-b">
			{title}
		</h1>
	);
};

export default DashboardPageTitle;
