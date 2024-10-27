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
      resolvers: [PrimeVueResolver()],
    }),
    Icons(),
    dts()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
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
      plugins: [
        copy({
          targets: [
            { src: 'manifest.json', dest: 'dist' }, // Adjust 'dist' to match your output directory
          ],
          hook: 'writeBundle', // Ensures it runs after the build is done
        })],
    },
  },
})
