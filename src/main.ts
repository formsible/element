// main.ts
import { createApp } from 'vue'
import { createNotivue } from 'notivue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import i18n from './configs/i18n'
import 'primeicons/primeicons.css'
import 'notivue/notification.css'
import 'notivue/animations.css'
import './assets/styles/index.css'

const notivue = createNotivue(/* options */)
const app = createApp(App)

app.use(PrimeVue, {
    theme: 'none',
})
app.use(i18n)
app.use(notivue)
app.mount('#app')
