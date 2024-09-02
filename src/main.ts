// main.ts
import './assets/styles/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'
import './assets/styles/scrollbar.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')
