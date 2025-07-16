import { POST, GET } from '@/api/request';
import type { BasicResponse } from '@/types';

/** 登录接口参数 */
export interface LoginParams {
  password?: string;
  username?: string;
}

/** 登录接口返回值 */
export interface LoginResult {
  accessToken: string;
}

/**
 * 登录
 */
export async function loginApi(data: LoginParams) {
  return POST<BasicResponse<LoginResult>>('/auth/login', data);
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return POST('/auth/logout');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return GET<string[]>('/auth/codes');
}
