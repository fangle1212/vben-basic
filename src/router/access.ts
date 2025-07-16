import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  AccessModeType,
} from '@/types';

import { generateAccessible } from '@/utils';

import { getAllMenusApi } from '@/api';
import { BasicLayout, BlankLayout } from '@/layouts';
import { preferences } from '@/preferences/index';

const forbiddenComponent = () => import('@/pages/fallback/Forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  console.log(preferences, 'preferences');
  const pageMap: ComponentRecordType = import.meta.glob('../pages/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    BlankLayout,
  };

  return await generateAccessible(
    preferences.app.accessMode as AccessModeType,
    {
      ...options,
      fetchMenuListAsync: async () => {
        ElMessage.primary($t('common.loadingMenu'));
        const { data } = await getAllMenusApi();
        return data;
      },
      // 可以指定没有权限跳转403页面
      forbiddenComponent,
      // 如果 route.meta.menuVisibleWithForbidden = true
      layoutMap,
      pageMap,
    },
  );
}

export { generateAccess };
