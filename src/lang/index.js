import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import { getToken } from '../utils/cookies'
Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale: getToken('lang') || 'zh',
    messages
})
export default i18n