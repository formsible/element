import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                NodeJS: 'readonly',
                module: 'readonly',
                require: 'readonly', // Add require to globals
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        files: ['**/*.{js,ts,vue}'],
        rules: {
            // Disable the rule that forbids require imports
            '@typescript-eslint/no-require-imports': 'off',
            // If you're using CommonJS and ESM mixed, you might also want:
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        ignores: ['dist'],
    },
]
