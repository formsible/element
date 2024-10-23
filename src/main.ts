// main.ts
import './assets/styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './assets/styles/scrollbar.css'
import './assets/styles/variables.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: 'none'
})

app.mount('#app')
