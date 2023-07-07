import axios from 'axios';
import cookie from 'js-cookie';
import { trackPromise } from 'react-promise-tracker';

// urls
export const BASE_URL = 'http://185.116.160.30:4000/api/v1';
// export const BASE_URL =
//   (process.env.REACT_APP_NOD_ENV === 'development' && process.env.REACT_APP_DEVELOPMENT_BASE_URL) ||
//   (process.env.REACT_APP_NOD_ENV === 'production' && process.env.REACT_APP_PRODUCTION_BASE_URL) ||
//   (process.env.REACT_APP_NOD_ENV === 'local' && process.env.REACT_APP_LOCAL_BASE_URL);

export const DOMAIN = 'http://185.116.160.30:4000';
// (process.env.REACT_APP_NOD_ENV === 'development' && process.env.REACT_APP_DEVELOPMENT_DOMAIN) ||
// (process.env.REACT_APP_NOD_ENV === 'production' && process.env.REACT_APP_PRODUCTION_DOMAIN) ||
// (process.env.REACT_APP_NOD_ENV === 'local' && process.env.REACT_APP_LOCAL_DOMAIN);

//imagesrep.tipax.ir/
// export const IMAGESREP =
//   (process.env.REACT_APP_NOD_ENV === 'development' && process.env.REACT_APP_DEVELOPMENT_DOMAIN) ||
//   (process.env.REACT_APP_NOD_ENV === 'local' && process.env.REACT_APP_LOCAL_DOMAIN) ||
//   (process.env.REACT_APP_NOD_ENV === 'staging' && process.env.REACT_APP_STAGING_DOMAIN) ||
//   (process.env.REACT_APP_NOD_ENV === 'production' && process.env.REACT_APP_PRODUCTION_DOMAIN);

export let errorResponse = {};

export const METHOD = {
  GET: 'get',
  HEAD: 'HEAD',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
};

const singleton = Symbol();
const singletonEnforcer = Symbol();

const defaultOptions = {
  baseURL: BASE_URL,
  method: METHOD.GET,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
};

export class ApiService {
  constructor(enforcer) {
    // if (enforcer !== singletonEnforcer) {
    //   throw new Error('Cannot construct singleton');
    // }
    const defaultOptions = {
      baseURL: BASE_URL,
      method: METHOD.GET,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.controller = new AbortController();
    this.session = axios.create(defaultOptions);
    this.session.interceptors.request.use((config) => {
      const token = cookie.get('34vf0fg_34fv_34sd');
      config.headers['Authorization'] = token;
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
        errorResponse.networkError = JSON.parse(JSON.stringify(error));
        return Promise.reject(error?.response?.data);
      }
    );
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  /*eslint-disable */
  get = (url, options = {}) => trackPromise(this.session.get(url, { ...defaultOptions, signal: this.controller.signal, ...options }));
  getWithoutLoading = (url, options = {}) => this.session.get(url, { ...defaultOptions, signal: this.controller.signal, ...options });
  post = (url, data, options = {}) => trackPromise(this.session.post(url, data, { ...defaultOptions, signal: this.controller.signal, ...options }));
  postWithoutLoading = (url, data, options = {}) => this.session.post(url, data, { ...defaultOptions, signal: this.controller.signal, ...options });
  put = (url, data, options = {}) => trackPromise(this.session.put(url, data, { ...defaultOptions, signal: this.controller.signal, ...options }));
  putWithoutLoading = (url, data, options = {}) => this.session.put(url, data, { ...defaultOptions, signal: this.controller.signal, ...options });
  patch = (url, data, options = {}) => trackPromise(this.session.patch(url, data, { ...defaultOptions, signal: this.controller.signal, ...options }));
  delete = (url, options = {}) => trackPromise(this.session.delete(url, { ...defaultOptions, signal: this.controller.signal, ...options }));
  remove = (...params) => this.session.delete(...params);
  abort = () => {
    this.controller.abort();
    this.controller = new AbortController();
  };
}

export default ApiService.instance;
