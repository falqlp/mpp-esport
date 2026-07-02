import eslint from '@eslint/js';
import angular from 'angular-eslint';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const apiFiles = ['apps/api/**/*.ts'];
const webFiles = ['apps/web/**/*.ts'];
const templateFiles = ['apps/web/**/*.html'];

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/generated/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { files: apiFiles, languageOptions: { globals: globals.node } },
  ...angular.configs.tsRecommended.map((config) => ({ ...config, files: webFiles })),
  {
    files: webFiles,
    processor: angular.processInlineTemplates,
    rules: { '@angular-eslint/prefer-on-push-component-change-detection': 'off' },
  },
  ...angular.configs.templateRecommended.map((config) => ({ ...config, files: templateFiles })),
);
