import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default [
	// 1. JS recommended baseline
	js.configs.recommended,

	// 2. TypeScript recommended rules
	...ts.configs.recommended,

	// 3. Svelte rules — .prettier variant disables rules
	// that conflict with Prettier formatting
	...svelte.configs.prettier,

	// 4. Global environments
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},

	// 5. TypeScript-aware parsing for .svelte files
	// projectService: true enables type-checked rules
	// extraFileExtensions is required so the TS parser
	// knows to process .svelte files
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},

	// 6. Prettier LAST — enables prettier/prettier rule and
	// turns off remaining ESLint style rules that conflict
	prettier,

	// 7. Allow _ prefix for intentionally unused variables (common convention)
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }]
		}
	},

	// 8. Ignored paths
	{
		ignores: ['node_modules/', 'build/', '.svelte-kit/', 'dist/']
	}
];
