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
				"k-primary-color": "var(--primary-1-color)",
				"k-primary-2-color": "var(--primary-2-color)",
				"k-secondary-color": "var(--secondary-1-color)",
				"k-bg-color": "var(--bg-color)",
				"k-dark-bg-color": "var(--dark-bg-color)",
				"k-faded-dark-bg-color": "var(--faded-dark-bg-color)",
				"k-text-color": "var(--text-color)",
				"k-opposite-text-color": "var(--opposite-text-color)",
				"k-grey-text-color": "var(--grey-text-1-color)",
			},
			borderColor: {
				"default": "var(--border-1-color)",
				"k-border-2-color": "var(--border-2-color)",
			},
		},
	},
	plugins: [],
};
