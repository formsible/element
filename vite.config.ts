import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Icons from 'unplugin-icons/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    Icons(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index'),
      name: '@formsible/element',
      fileName: (format) => `element.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
