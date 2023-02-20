import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getStorage('tt-user')
  },
  mutations: {
    initUser (state, payload) {
      state.user = payload
      setStorage('tt-user', payload)
    },
    removeUser (state) {
      state.user = null
      removeStorage('tt-user')
    }
  },
  actions: {
  },
  modules: {
  }
})
