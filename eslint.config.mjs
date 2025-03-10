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
			'@stylistic': stylistic,
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
			"vue/component-api-style": ["error", ["script-setup", "composition"]],
			"vue/block-lang": ["error", { "script": { "lang": "ts" } }],
			'@stylistic/indent': ["error", "tab"],
			'@stylistic/quotes': ["warn", "double", { avoidEscape: true }],
			'@stylistic/block-spacing': ["error"],
			'@stylistic/object-curly-spacing': ["error", "always"],
			'@stylistic/semi': ["error"],
			"@stylistic/quote-props": ["error", "as-needed"],
			"@stylistic/member-delimiter-style": ["error"]
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