import { acceptHMRUpdate, defineStore, type StoreDefinition } from 'pinia';
import type { UserInfo } from '@/types';
import { getUserInfoApi, loginApi, logoutApi, getAllMenusApi } from '@/api';
import { resetAllStores } from '@/store';
import { type RouteRecordRaw } from 'vue-router';
import { LOGIN_PATH } from '@/constants';
import { resetRoutes, addDynamicRouters, router as router } from '@/router';

interface UserState {
  userInfo: UserInfo | null;
  token: string;
  routers: RouteRecordRaw[];
}

export const useUserStore: StoreDefinition = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: '',
    routers: [],
  }),
  actions: {
    // 登录
    async authLogin(params: Record<string, any>) {
      const { data } = await loginApi(params);
      const { accessToken } = data;

      if (accessToken) {
        this.token = accessToken;
        return accessToken;
      }
      throw new Error('No accessToken');
    },

    // 获取用户信息
    async getUserInfo() {
      const { data } = await getUserInfoApi();
      this.userInfo = data;
      return data;
    },

    // 用户路由
    async getMenus() {
      const { data } = await getAllMenusApi();
      this.routers = addDynamicRouters(router, data);
      return this.routers;
    },
    // 退出登录
    async logout(redirect: boolean = true) {
      await logoutApi();
      resetAllStores();
      resetRoutes();
      // 回登录页带上当前路由地址
      const router = useRouter();
      await router.replace({
        path: LOGIN_PATH,
        query: redirect
          ? {
              redirect: encodeURIComponent(router.currentRoute.value.fullPath),
            }
          : {},
      });
    },
  },
  persist: {
    // 持久化
    pick: ['userInfo', 'token'],
  },
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
