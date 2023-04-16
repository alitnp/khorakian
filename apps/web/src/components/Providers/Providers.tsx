"use client";

import { RtlProvider } from "@/components/Providers/RtlProvider";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CacheProvider>
			<ChakraProvider>
				<RtlProvider>{children}</RtlProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
