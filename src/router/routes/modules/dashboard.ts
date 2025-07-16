import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '00',
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('@/pages/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '11',
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('@/pages/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '22',
        },
      },
    ],
  },
];

export default routes;
