"use client";

import Navigation from "@/components/Header/Navigation";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { GrMenu } from "react-icons/gr";

const Header: FC = () => {
	//states
	const [isDrawerOpen, setIsDrawerOpen] =
		useState<boolean>(false);

	//functions
	const toggleDrawerOpen = useCallback(
		() => setIsDrawerOpen((prevState) => !prevState),
		[]
	);

	return (
		<header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-12 bg-k-faded-dark-bg-color text-k-opposite-text-color k-container">
			<div className="hidden md:block">
				<Navigation />
			</div>
			<div className="block md:hidden">
				<IconButton
					aria-label="منو اصلی"
					icon={<GrMenu />}
					onClick={toggleDrawerOpen}
				/>
			</div>
			<Link href="/login" className="flex items-center gap-2">
				صفحه من
				<VscAccount />
			</Link>
			<Drawer
				isOpen={isDrawerOpen}
				onClose={toggleDrawerOpen}
				placement="right"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>منو اصلی</DrawerHeader>

					<DrawerBody>
						<Navigation />
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</header>
	);
};

export default Header;
