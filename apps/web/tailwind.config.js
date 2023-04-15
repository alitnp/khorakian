// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} \*/
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				vazir: ["var(--font-vazir)", ...fontFamily.sans],
			},
			colors: {
				"k-bg-color": "var(--bg-color)",
			},
			borderColor: {
				"default": "var(--border-1-color)",
				"k-border-2-color": "var(--border-2-color)",
			},
		},
	},
	plugins: [],
};
