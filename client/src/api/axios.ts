/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token != null) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

api.interceptors.request.use(authInterceptor);

export { api };
