/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 14:58:57
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 22:46:30
 */
import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import store from '@/store/index.js'
import { GoEasy, goEasy } from './goEasy/index.js'
import utils from './utils/index.js'

Vue.use(uView)
Vue.use(utils)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.goEasy = goEasy
Vue.prototype.GoEasy = GoEasy

Vue.prototype.formatDate = function (t) {
  t = t || Date.now()
  let time = new Date(t)
  let str =
    time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  str += '-'
  str += time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  str += ' '
  str += time.getHours()
  str += ':'
  str += time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  return str
}

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
