import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';
import { useAccessStore } from '@/store';

let notificationInstance: { close: () => void } | null = null;

const requestInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});

const loginExpired = () => {
  // const userStore = useUserStore();
  // const logout = userStore.logout;
  // logout();
};

const errorHandler = (error: AxiosError) => {
  // 处理 HTTP 错误
  let errMsg = '';
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        loginExpired();
        break;
      case 404:
        errMsg = '接口不存在';
        break;
      case 500:
        errMsg = '服务器错误';
        break;
      default:
        errMsg = '网络错误';
    }
  } else if (error.request) {
    errMsg = '无响应，请检查网络';
  } else {
    errMsg = `请求配置错误: ${error.message}`;
  }
  if (errMsg) {
    if (notificationInstance) {
      notificationInstance.close();
    }
    notificationInstance = ElNotification({
      key: 'requestNotification',
      title: '提示信息!',
      message: errMsg,
      type: 'error',
    });
  }
  return Promise.reject(error);
};

requestInstance.interceptors.request.use((config) => {
  const useAccess = useAccessStore();
  const token = useAccess.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, errorHandler);

requestInstance.interceptors.response.use((response) => {
  const { code, message: msg } = response.data;
  if (code === 200) {
    return Promise.resolve(response.data);
  } else if (code === 401) {
    loginExpired();
  } else {
    ElMessage.error(msg || '请求错误');
  }
  return Promise.reject(response);
}, errorHandler);

export const GET = <T = any>(
  url: string,
  params?: Record<string, any>,
  otherOptions?: AxiosRequestConfig,
): Promise<T> =>
  requestInstance({ url, params, method: 'get', ...otherOptions });

export const POST = <T = any>(
  url: string,
  data?: Record<string, any>,
  otherOptions?: AxiosRequestConfig,
): Promise<T> =>
  requestInstance({
    url,
    data,
    method: 'post',
    ...otherOptions,
  });

export default requestInstance;
