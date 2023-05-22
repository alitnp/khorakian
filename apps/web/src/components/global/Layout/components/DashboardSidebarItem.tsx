import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface IDashboardSidebarItem {
	title: string;
	path: string;
}

const DashboardSidebarItem: FC<IDashboardSidebarItem> = ({
	title,
	path,
}) => {
	//hooks
	const { pathname } = useRouter();

	return (
		<Link
			href={path}
			className={`px-6 py-2 text-center rounded-lg ${
				path === pathname
					? "bg-k-primary-2-color text-k-opposite-text-color"
					: "hover:bg-k-grey-bg-2-color"
			}`}
		>
			{title}
		</Link>
	);
};

export default DashboardSidebarItem;
