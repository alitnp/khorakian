import routes from "@/global/constants/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

const navigationItems = [
	{ label: "خانه", route: routes.home.path },
	{ label: "تجربیات", route: routes.experience.path },
	{
		label: "ایده‌ها و نظرها",
		route: routes.experience.path,
	},
];

const Navigation: FC<{ close?: () => void }> = ({
	close,
}) => {
	const { push } = useRouter();

	const renderItems = useMemo(() => {
		if (!close)
			return (
				<ul className="flex flex-row gap-6">
					{navigationItems.map((item) => (
						<li key={item.label}>
							<Link href={item.route}>{item.label}</Link>
						</li>
					))}
				</ul>
			);
		return (
			<ul className="flex flex-col gap-6 ">
				{navigationItems.map((item) => (
					<li
						key={item.label}
						onClick={() => {
							push(item.route);
							close();
						}}
						className="font-medium cursor-pointer"
					>
						{item.label}
					</li>
				))}
			</ul>
		);
	}, []);

	return <nav>{renderItems}</nav>;
};

export default Navigation;
