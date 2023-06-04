import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import webConfig from "@/global/constants/webConfig";
import { getCookie } from "cookies-next";

// urls
const BASE_URL = webConfig.baseUrl;

export let errorResponse = {};

export const METHOD = {
	GET: "get",
	HEAD: "HEAD",
	PUT: "PUT",
	DELETE: "DELETE",
	PATCH: "PATCH",
	POST: "POST",
};

const singleton = Symbol();
const singletonEnforcer = Symbol();

const defaultOptions = {
	baseURL: BASE_URL,
	method: METHOD.GET,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 120000,
};

export class WebApiService {
	constructor() {
		// if (enforcer !== singletonEnforcer) {
		//   throw new Error('Cannot construct singleton');
		// }
		const defaultOptions = {
			withCredentials: true,
			credentials: "include",
			baseURL: BASE_URL,
			method: METHOD.GET,
			headers: {
				"Content-Type": "application/json",
			},
		};

		this.controller = new AbortController();
		this.session = axios.create(defaultOptions);
		this.session.interceptors.request.use((config) => {
			const token = getCookie(webConfig.cookieTokenName);
			config.headers["Authorization"] = token;
			config.params = Object.assign({}, config.params || {});

			return config;
		});

		this.session.interceptors.response.use(
			(response) => {
				errorResponse = {};
				return response.data;
			},
			(error) => {
				errorResponse.error = error.response;
				errorResponse.networkError = JSON.parse(
					JSON.stringify(error)
				);
				return Promise.reject(error?.response?.data);
			}
		);
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new WebApiService(singletonEnforcer);
		}

		return this[singleton];
	}

	/*eslint-disable */
	get = (url, options = {}) =>
		trackPromise(
			this.session.get(url, {
				...defaultOptions,
				signal: this.controller.signal,
				...options,
			})
		);
	getWithoutLoading = (url, options = {}) =>
		this.session.get(url, {
			...defaultOptions,
			signal: this.controller.signal,
			...options,
		});
	post = (url, data, options = {}) =>
		trackPromise(
			this.session.post(url, data, {
				...defaultOptions,
				signal: this.controller.signal,
				...options,
			})
		);
	postWithoutLoading = (url, data, options = {}) =>
		this.session.post(url, data, {
			...defaultOptions,
			signal: this.controller.signal,
			...options,
		});
	put = (url, data, options = {}) =>
		trackPromise(
			this.session.put(url, data, {
				...defaultOptions,
				signal: this.controller.signal,
				...options,
			})
		);
	putWithoutLoading = (url, data, options = {}) =>
		this.session.put(url, data, {
			...defaultOptions,
			signal: this.controller.signal,
			...options,
		});
	patch = (url, data, options = {}) =>
		trackPromise(
			this.session.patch(url, data, {
				...defaultOptions,
				signal: this.controller.signal,
				...options,
			})
		);
	delete = (url, options = {}) =>
		trackPromise(
			this.session.delete(url, {
				...defaultOptions,
				signal: this.controller.signal,
				...options,
			})
		);
	remove = (...params) => this.session.delete(...params);
	abort = () => {
		this.controller.abort();
		this.controller = new AbortController();
	};
}

export default WebApiService.instance;
