import Link from "next/link";

import { FC } from "react";
import { VscAccount } from "react-icons/vsc";

const Header: FC = () => {
	return (
		<header className="fixed top-0 left-0 flex items-center justify-between w-full border-b h-14 bg-k-bg-color">
			<nav>
				<ul className="flex gap-4">
					<li>
						<Link href="/">خانه</Link>
					</li>
					<li>
						<Link href="/hello">تازه ها</Link>
					</li>
				</ul>
			</nav>
			<div className="flex items-center gap-2">
				صفحه من
				<VscAccount />
			</div>
		</header>
	);
};

export default Header;
