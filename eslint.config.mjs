// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginCypress from 'eslint-plugin-cypress/flat';
import globals from 'globals';

export default tseslint.config(
	{ ignores: ['**/*.d.ts', '**/coverage', '**/dist', '**/cache'] },
	{
		files: ['packages/konponents-next/**/*.cy.ts'],
		extends: [
			eslintPluginCypress.configs.recommended,
		],
	},
	{
		files: ['**/*.{vue,ts,mts}'],
		plugins: {
			'@stylistic/js': stylistic,
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...eslintPluginVue.configs['flat/strongly-recommended'],
		],
		rules: {
			"vue/html-indent": ["error", "tab", { alignAttributesVertically: false }],
			"vue/html-quotes": ["error", "double", { "avoidEscape": true }],
			"vue/max-attributes-per-line": ["error", {
				singleline: { max: 3 }
			}],
			'@stylistic/js/indent': ["error", "tab"],
			'@stylistic/js/quotes': ["warn", "double", { avoidEscape: true }],
			'@stylistic/js/block-spacing': ["error"],
			'@stylistic/js/object-curly-spacing': ["error", "always"],
			'@stylistic/js/semi': ["error"],
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: tseslint.parser,
			},
		}
	},
);