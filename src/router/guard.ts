import type { Router, RouteRecordRaw } from 'vue-router';
import { LOGIN_PATH, DEFAULT_PATH } from '@/constants';
import NProgress from 'nprogress';
import { useUserStore } from '@/store';
import { noLoginRoutes, rootRoute } from '@/router/routers';
import type { MenuItem } from '@/types';
import { flatToTree } from '@/utils';
import { AuthLayout, BasicLayout, BlankLayout, RouteView } from '@/layouts';
import type { Recordable } from '@/types';

const layoutComponents: Recordable<any> = {
  AuthLayout,
  BasicLayout,
  BlankLayout,
  RouteView,
};

const constantRouterComponents = import.meta.glob('@/pages/**/*.vue');

/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  // 记录已经加载的页面
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // 页面加载进度条
    if (!to.meta.loaded) {
      NProgress.start();
    }
    return true;
  });

  router.afterEach((to) => {
    // 记录页面是否加载,如果已经加载，后续的页面切换动画等效果不在重复执行
    loadedPaths.add(to.path);
    NProgress.done();
  });
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to) => {
    console.log(to, 'to');
    const userStore = useUserStore();

    // 静态路由，这些路由不需要进入权限拦截
    if (noLoginRoutes.includes(to.path)) {
      return true;
    }
    // accessToken 检查
    if (!userStore.token) {
      // 明确声明忽略权限访问权限，则可以访问
      if (to.meta.ignoreAccess) {
        return true;
      }

      // 没有访问权限，跳转登录页面
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          query:
            to.fullPath === DEFAULT_PATH
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // 携带当前跳转的页面，登录后重新跳转该页面
          replace: true,
        };
      }
      return true;
    }
    if (!userStore.userInfo) {
      await userStore.getUserInfo();
    }

    // 如果没有动态路由，则先获取菜单生成路由
    if (userStore.routers.length === 0) {
      await userStore.getMenus();
      // 动态添加路由后，必须用 replace: true 重新进入，才能保证其他路由正常工作
      return { ...to, replace: true };
    }

    if (to.path === LOGIN_PATH) {
      return { path: DEFAULT_PATH, replace: true };
    }

    return true;
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router);
  /** 权限访问 */
  setupAccessGuard(router);
}

/**
 * 添加动态路由
 * @param route
 * @param parentRoute
 */
const addDynamicRouters = function (router: Router, routes: MenuItem[]) {
  const treeRoutes = flatToTree(routes, 0);
  const dynamicRoutes = formatRouters(treeRoutes as MenuItem[], null);
  rootRoute.children = dynamicRoutes;
  rootRoute.redirect = dynamicRoutes[0].path;
  router.addRoute(rootRoute);
  console.log(router.getRoutes(), rootRoute);
  return dynamicRoutes;
};

/**
 * 格式化路由
 * @param routes
 */
function formatRouters(
  treeRoutes: MenuItem[],
  parent: RouteRecordRaw | null,
): RouteRecordRaw[] {
  return treeRoutes.map((item) => {
    const {
      component,
      meta,
      name,
      redirect,
      children = [],
    } = item as MenuItem & { children?: MenuItem[] };
    let { path } = item;
    path = path || `${(parent && parent.path) || ''}/${name}`;
    const hasChildren = children && children.length;
    const firstChildPath = hasChildren
      ? `${path}/${children[0].path || children[0].name}`
      : '';
    const route: RouteRecordRaw = {
      path,
      redirect: redirect || component in layoutComponents ? firstChildPath : '',
      name,
      component:
        layoutComponents[component] ||
        constantRouterComponents[
          `/src/pages/${parent ? String(parent.name) + '/' : ''}${name}/index.vue`
        ],
      meta,
    };
    if (hasChildren) {
      route.children = formatRouters(children, route);
    }
    return route;
  });
}

// /**
//  * 获取按钮权限
//  * @param routes
//  * @param rules
//  */
// function findRules(routes: Route[], rules: string[] = []): string[] {
//   for (const route of routes) {
//     if (route.auth && Array.isArray(route.auth)) {
//       rules = rules.concat(route.auth);
//     }
//     if (route.children) {
//       rules = findRules(route.children, rules);
//     }
//   }
//   return rules;
// }

export {
  createRouterGuard,
  addDynamicRouters,
  formatRouters,
  // findRules,
};
