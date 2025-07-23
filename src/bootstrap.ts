import { initStores } from '@/store';
import { useTitle } from '@vueuse/core';
import App from './App.vue';
import { router } from './router';
import { setupI18n } from '@/locales';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
import './style.css';
import '../mock';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置路由及路由守卫
  app.use(router);

  // 动态更新标题
  watchEffect(() => {
    const routeTitle = router.currentRoute.value.meta?.title;
    const pageTitle =
      typeof routeTitle === 'string' ? `${$t(routeTitle)} - ` : '';
    useTitle(pageTitle);
  });

  app.mount('#app');
}

export { bootstrap };
