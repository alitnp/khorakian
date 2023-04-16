import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtl from "stylis-plugin-rtl";
import { ReactNode } from "react";

export function RtlProvider({
	children,
}: {
	children: ReactNode;
}) {
	const cache = createCache({
		key: "css-fa",
		stylisPlugins: [rtl],
	});
	return (
		<CacheProvider value={cache}>{children}</CacheProvider>
	);
}
