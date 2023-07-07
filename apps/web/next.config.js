/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		baseUrl: "http://185.116.160.30:4000/api/v1",
		domain: "http://185.116.160.30:4000",
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
