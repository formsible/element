import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Icons from 'unplugin-icons/vite'
import path from 'path'
import copy from 'rollup-plugin-copy'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: true,
            resolvers: [PrimeVueResolver()],
        }),
        Icons(),
        dts({
            insertTypesEntry: true,
            include: [
                'src/components/**/*.vue',
                'src/types/**/*.ts',
                'src/index.ts',
                'src/utils/**/*.ts',
            ],
        }),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index'),
            name: '@formsible/element',
            fileName: 'element',
        },
        rollupOptions: {
            external: [
                'vue',
                '@vueuse/core',
                '@vueuse/integrations',
                'primevue',
                'primeicons',
                'tailwindcss-primeui',
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vueuse/core': 'VueUseCore',
                    '@vueuse/integrations': 'VueUseIntegrations',
                    primevue: 'PrimeVue',
                    primeicons: 'PrimeIcons',
                    'tailwindcss-primeui': 'TailwindPrimeUI',
                },
            },
            plugins: [
                copy({
                    targets: [
                        { src: 'src/manifest.json', dest: 'dist' }, // Adjust 'dist' to match your output directory
                    ],
                    hook: 'writeBundle', // Ensures it runs after the build is done
                }),
            ],
        },
    },
})
