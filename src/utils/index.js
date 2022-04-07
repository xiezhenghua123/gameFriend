/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-06 23:27:30
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 23:27:31
 */
import chat from './chat.js'

export default {
  install(Vue) {
    Vue.prototype.$methods = {
      chat,
    }
  },
}
