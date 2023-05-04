import routes from "@/global/constants/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

const navigationItems = [
	{ label: "خانه", route: routes.home.path },
	{ label: "تازه ها", route: routes.home.path },
];

const Navigation: FC<{ close?: () => void }> = ({
	close,
}) => {
	const { push } = useRouter();

	const renderItems = useMemo(() => {
		if (!close)
			return navigationItems.map((item) => (
				<li key={item.label}>
					<Link href={item.route}>{item.label}</Link>
				</li>
			));
		return navigationItems.map((item) => (
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
		));
	}, []);

	return (
		<nav>
			<ul className="flex flex-col gap-4 sm:flex-row">
				{renderItems}
			</ul>
		</nav>
	);
};

export default Navigation;
