import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '../utils/cookies'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        language: getToken('lang') || 'zh'
    },
    mutations: {
        changeStoreLanguage(state, data) {
            state.language = data
            setToken('lang', data)
        }
    }
})