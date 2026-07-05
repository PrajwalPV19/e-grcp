import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/mock-api',
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('e-grcp-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? 'Unexpected network error';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
