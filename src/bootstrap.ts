import { initStores } from '@/store';
import App from './App.vue';
import { router } from './router';
import { setupI18n } from '@/locales';
import { useSystemStore } from '@/store';
import '@/assets/css';
import '../mock';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  const systemStore = useSystemStore();
  // 国际化 i18n 配置
  await setupI18n(app, systemStore.lang);

  // 配置路由及路由守卫
  app.use(router);

  app.mount('#app');
}

export { bootstrap };
