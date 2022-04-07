/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 21:42:49
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 21:52:03
 */
const state = () => {
  return {
    isLogin: false,
    userInfo: {},
  }
}
const getters = {}
const actions = {
  setLogin({ commit }, data) {
    commit('setLogin', data)
  },
  setUserInfo({ commit }, data) {
    commit('setUserInfo', data)
  },
}
const mutations = {
  setLogin(state, data) {
    state.isLogin = data
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
