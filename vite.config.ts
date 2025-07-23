import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';
// elementUi自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@/locales': ['$t'],
        },
      ],
      eslintrc: {
        enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        globalsPropValue: true,
      },
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    eslintPlugin({
      include: ['src/**/*.{js,ts,vue}'],
      exclude: ['node_modules', 'dist', 'build'],
    }),
    viteMockServe({
      enable: process.env.NODE_ENV === 'development', // 仅开发环境启用
      watchFiles: true, // 监听 Mock 文件变化
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
