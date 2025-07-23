import { defineStore, type StoreDefinition } from 'pinia';
import type { SupportedLanguagesType } from '@/locales/typing';

interface SystemState {
  lang: SupportedLanguagesType;
}

export const useSystemStore: StoreDefinition = defineStore('system', {
  state: (): SystemState => ({
    lang: 'zh-CN',
  }),
});
