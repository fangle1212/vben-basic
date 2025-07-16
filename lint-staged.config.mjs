/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,vue}': [
    'eslint --fix', // 运行 ESLint 检查并自动修复
    'prettier --write', // 运行 Prettier 格式化
  ],
  // '*.{css,scss,vue}': [
  //   'stylelint --fix', // 运行 Stylelint 检查并自动修复
  //   'prettier --write', // 运行 Prettier 格式化
  // ],
};
