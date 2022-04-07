/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 12:10:34
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let store = new Vuex.Store({
  actions,
  getters,
  modules,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.removeStorageSync(key),
      },
      path: ['appState'],
    }),
  ],
})

if (module.hot) {
  module.hot.accept(['./actions', './getters', './modules'], () => {
    store.hotUpdate({
      actions: require('./actions'),
      getters: require('./getters'),
      modules: require('./modules'),
    })
  })
}

export default store
