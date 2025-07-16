import { GET } from '@/api/request';
import type { RouteRecordStringComponent, BasicResponse } from '@/types';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return GET<BasicResponse<RouteRecordStringComponent[]>>('/menu/all');
}
