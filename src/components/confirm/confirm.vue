<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 20:42:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 23:09:43
-->
<template>
  <view class="confirm-button" :style="{ 'margin-top': marT + 'rpx' }">
    <u-button size="large" type="primary" @click="confirm"> 点击登录 </u-button>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import restApi from '@/goEasy/lib/restapi'
import renderConversations from '@/pages/minix/renderConversations'

export default {
  name: 'confirm',
  mixins: [renderConversations],
  props: {
    marT: {
      type: Number,
      default: 300,
      validator: function (value) {
        return value > 0
      },
    },
  },
  methods: {
    ...mapActions('appState', ['setLogin', 'setUserInfo']),
    confirm() {
      const that = this
      wx.login({
        success(res) {
          if (res.code) {
          }
        },
      })
      wx.getUserProfile({
        desc: '获取头像',
        success(res) {
          that.setLogin(true)
          uni.setStorageSync('currentUser', restApi.findUser('Juanita', '123'))
          that.setUserInfo(res.userInfo)
          that.$methods.chat.connect(that)
          that.goEasy.im.on(
            that.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED,
            content => {
              that.renderConversations(content)
            }
          )
        },
        fail(res) {
          console.log(res)
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.confirm-button {
  font-size: $uni-font-size-lg;
  width: 200rpx;
  margin: 0 auto;
}
</style>
