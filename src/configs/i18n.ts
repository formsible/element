import { createI18n } from 'vue-i18n'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

const messages = {
    vi,
    en,
}

const i18n = createI18n({
    locale: 'vi',
    fallbackLocale: 'en',
    messages,
    legacy: false,
})

export default i18n
