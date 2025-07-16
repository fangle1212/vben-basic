import { LOGIN_PATH, DEFAULT_PATH } from '@/constants';
import type { RouteRecordRaw } from 'vue-router';
import { AuthLayout, BasicLayout } from '@/layouts';

/** 全局404页面 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/pages/fallback/NotFound.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: RouteRecordRaw[] = [
  /**
   * 根路由
   * 使用基础布局，作为所有页面的父级容器，子级就不必配置BasicLayout。
   * 此路由必须存在，且不应修改
   */
  {
    component: BasicLayout,
    meta: {
      hideInBreadcrumb: true,
      title: 'Root',
    },
    name: 'Root',
    path: DEFAULT_PATH,
    children: [],
  },
  {
    component: AuthLayout,
    meta: {
      hideInTab: true,
      title: 'auth',
    },
    name: 'auth',
    path: '/auth',
    redirect: LOGIN_PATH,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/core/auth/UserLogin.vue'),
        meta: {
          title: '登录',
        },
      },
    ],
  },
];

export { fallbackNotFoundRoute, coreRoutes };
