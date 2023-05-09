import "@/assets/style/global.css";
import "@/assets/style/antCustomization.css";
import "@/assets/style/editorjsCustomizations.css";
import Layout from "@/components/global/Layout/Layout";
import { store } from "@/redux/store";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({
	Component,
	pageProps,
}: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
