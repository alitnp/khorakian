import localFont from "next/font/local";

export const vazir = localFont({
	src: [
		{
			path: "./Vazir-Thin.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "./Vazir-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./Vazir.woff2",
			weight: "normal",
			style: "normal",
		},
		{
			path: "./Vazir-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./Vazir-Bold.woff2",
			weight: "bold",
			style: "normal",
		},
		{
			path: "./Vazir-Bold.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-vazir",
});
