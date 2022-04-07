/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 14:50:36
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 00:07:26
 */
import { mapState } from 'vuex'
import renderConversations from './renderConversations'

export default {
  data() {
    return {}
  },
  mixins: [renderConversations],
  computed: {
    ...mapState('appState', ['isLogin']),
  },
  onLoad() {
    this.$methods.chat.connect(this)
  },
  onShow() {
    if (this.isLogin) {
      //监听会话列表变化
      let self = this

      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, content => {
        self.renderConversations(content)
      })
      this.goEasy.im.latestConversations({
        onSuccess: function (result) {
          let content = result.content
          self.renderConversations(content)
        },
        onFailed: function (error) {
          //获取失败
          console.log(
            '失败获取最新会话列表, code:' +
              error.code +
              ' content:' +
              error.content
          )
        },
      })
    }
  },
}
