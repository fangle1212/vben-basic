import { initStores } from '@/store';
import { useTitle } from '@vueuse/core';
import App from './App.vue';
import { router } from './router';
import { setupI18n } from '@/locales';
import { preferences } from '@/preferences/index';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
import './style.css';
import '../mock';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 配置路由及路由守卫
  app.use(router);

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (typeof routeTitle === 'string' ? `${$t(routeTitle)} - ` : '') +
        preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
