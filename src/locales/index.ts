import { createI18n, type Composer } from 'vue-i18n';
import type { App } from 'vue';
import type { Language } from 'element-plus/es/locale';
import enLocale from 'element-plus/es/locale/lang/en';
import defaultLocale from 'element-plus/es/locale/lang/zh-cn';
import type { SupportedLanguagesType } from './typing';
import { loadLocalesMapFromDir } from './utils';

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: '',
  messages: {},
});

const modules = import.meta.glob('./langs/**/*.json');

const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules,
);

/**
 * 加载应用特有的语言包
 * 这里也可以改造为从服务端获取翻译数据
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
    loadThirdPartyMessage(lang),
  ]);
  return appLocaleMessages?.default;
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadElementLocale(lang)]);
}

const elementLocale = ref<Language>();

/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en-US': {
      elementLocale.value = enLocale;
      break;
    }
    case 'zh-CN': {
      elementLocale.value = defaultLocale;
      break;
    }
  }
}

function setI18nLanguage(lang: SupportedLanguagesType) {
  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang);
}

async function loadLocaleMessages(lang: SupportedLanguagesType): Promise<void> {
  if (unref(i18n.global.locale) === lang) {
    return setI18nLanguage(lang);
  }

  const loadMessage = await loadMessages(lang);
  i18n.global.setLocaleMessage(lang, loadMessage);

  return setI18nLanguage(lang);
}

async function setupI18n(app: App, lang: SupportedLanguagesType) {
  await loadLocaleMessages(lang);
  app.use(i18n);
}

const $t = i18n.global.t as Composer['t'];

export { $t, elementLocale, setupI18n, loadLocaleMessages };
