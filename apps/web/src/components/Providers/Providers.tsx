"use client";

import { RtlProvider } from "@/components/Providers/RtlProvider";
import { store } from "@/redux/store";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider} from "react-redux";

export function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CacheProvider>
			<ChakraProvider>
				<RtlProvider>
					<ReduxProvider store={store}>
						{children}
					</ReduxProvider>
				</RtlProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
