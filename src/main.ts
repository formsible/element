// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './assets/scrollbar.css'
import './assets/variables.css'
import './assets/tailwind.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: 'none'
})

app.mount('#app')
