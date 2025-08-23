import js from '@eslint/js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettierRecommand from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { js },

    extends: ['js/recommended'],

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // React의 JSX 런타임(automatic) 설정
  pluginReact.configs.flat['jsx-runtime'],
  // JSX 접근성(Accessibility) 권장 규칙 적용
  pluginJsxA11y.flatConfigs.recommended,
  // React Hooks의 올바른 사용을 위한 권장 규칙 적용
  pluginReactHooks.configs['recommended-latest'],
  // Prettier와 ESLint 충돌 방지 및 Prettier 포맷팅 규칙 적용
  pluginPrettierRecommand,

  {
    rules: {
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
    },
  },
]);
