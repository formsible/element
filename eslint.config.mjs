import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    {
        languageOptions: {
            globals: {
                ...globals.node, // Add Node.js globals
            },
        },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
]
