import routes from "@/global/constants/routes";
import Link from "next/link";
import { FC } from "react";

const navigationItems = [
	{ label: "خانه", route: routes.home.path },
	{ label: "تازه ها", route: routes.home.path },
];

const Navigation: FC = () => {
	return (
		<nav>
			<ul className="flex flex-col gap-4 sm:flex-row">
				{navigationItems.map((item) => (
					<li key={item.label}>
						<Link href={item.route}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
