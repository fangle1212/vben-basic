import { defineStore, type StoreDefinition } from 'pinia';
import type { SupportedLanguagesType } from '@/locales/typing';
// import { loadLocaleMessages } from '@/locales';
// import NProgress from 'nprogress';
const router = useRouter();
interface SystemState {
  lang: SupportedLanguagesType;
}

export const useSystemStore: StoreDefinition = defineStore('system', {
  state: (): SystemState => ({
    lang: 'zh-CN',
  }),
  actions: {
    async setLang(lang) {
      this.lang = lang;

      // router.go(0);
      console.log(router, useRouter);
      // NProgress.start();
      // await loadLocaleMessages(lang);
      // NProgress.done();
    },
  },
  persist: {
    // 持久化
    pick: ['lang'],
  },
});
