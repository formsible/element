// main.ts
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura,
})

app.mount('#app')
