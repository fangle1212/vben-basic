import { GET, POST } from '@/api/request';
import type { UserInfo, BasicResponse, MenuItem } from '@/types';

export interface LoginParams {
  password?: string;
  username?: string;
}

export interface LoginResult {
  accessToken: string;
}

// 登录
export async function loginApi(data: LoginParams) {
  return POST<BasicResponse<LoginResult>>('/auth/login', data);
}

// 退出登录
export async function logoutApi() {
  return POST('/auth/logout');
}

// 获取用户信息
export const getUserInfoApi = () =>
  GET<BasicResponse<UserInfo>>('/api/userinfo');

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return GET<BasicResponse<MenuItem[]>>('/menu/all');
}
