/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		baseUrl: process.env.API_BASE_URL,
		domain: process.env.DOMAIN_BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "4000",
				pathname: "/image/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
				pathname: "/image/**",
			},
		],
	},
};

module.exports = nextConfig;
