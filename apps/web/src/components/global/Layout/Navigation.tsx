import routes from "@/global/constants/webRoutes";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";

const Navigation: FC<{ close?: () => void }> = ({
	close,
}) => {
	const { user } = useSelector(
		(state: RootState) => state.user
	);

	const { push } = useRouter();
	//constants
	const navigationItems = useMemo(
		() => [
			{ label: "خانه", route: routes.home.path },
			{ label: "مطالب", route: routes.postAllContents.path },
			{ label: "تجربیات", route: routes.experience.path },
			{
				label: "تجربه کاربران",
				route: routes.userExperienceList.path,
			},
			{
				label: "ایده‌ها و نظرها",
				route: routes.idea.path,
			},
			{
				label: "پیام به من",
				route: user
					? routes.dashboardDirectMessage.path
					: routes.login.path,
			},
		],
		[user]
	);

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
	}, [navigationItems]);

	return <nav>{renderItems}</nav>;
};

export default Navigation;
