import { LOGIN_PATH, DEFAULT_PATH } from '@/constants';
import type { RouteRecordRaw } from 'vue-router';
import { AuthLayout, BasicLayout } from '@/layouts';

const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/pages/fallback/NotFound.vue'),
  path: '/:path(.*)*',
};

const rootRoute: RouteRecordRaw = {
  component: BasicLayout,
  meta: {
    hideInBreadcrumb: true,
    title: 'Root',
  },
  name: 'root',
  path: DEFAULT_PATH,
  children: [],
};

const staticRoutes: RouteRecordRaw[] = [
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
  fallbackNotFoundRoute,
];

const noLoginRoutes: string[] = ['/404'];

export { staticRoutes, rootRoute, noLoginRoutes };
