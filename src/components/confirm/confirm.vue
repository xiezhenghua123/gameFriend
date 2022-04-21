<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 20:42:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-21 19:45:20
-->
<template>
  <view>
    <view class="confirm-button" :style="{ 'margin-top': marT + 'rpx' }">
      <u-button size="large" type="primary" @click="confirm">
        点击登录
      </u-button>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import restApi from '@/goEasy/lib/restapi'
import renderConversations from '@/pages/minix/renderConversations'
import { login } from '@/api/user.js'

export default {
  name: 'confirm',
  mixins: [renderConversations],
  props: {
    marT: {
      type: Number,
      default: 300,
      validator: function (value) {
        return value > 0
      }
    }
  },
  methods: {
    ...mapActions('appState', ['setLogin', 'setUserInfo']),
    //获取微信code
    login() {
      return new Promise((res, rej) => {
        wx.login({
          success({ code }) {
            if (code) {
              res(code)
            }
          }
        })
      })
    },
    confirm() {
      const that = this
      wx.getUserProfile({
        desc: '获取头像',
        success({ userInfo }) {
          that.login().then(code => {
            login({
              js_code: code,
              name: userInfo.nickName,
              avatar: userInfo.avatarUrl
            }).then(({ data }) => {
              that.setLogin(true)
              that.$emit('isLogin', true)
              const userInfo = {
                name: data.name,
                avatar: data.avatar,
                uuid: data.openid
              }
              // uni.setStorageSync('currentUser', userInfo)
              that.setUserInfo(userInfo)
              that.$methods.chat.connect(that, userInfo)
              that.goEasy.im.on(
                that.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED,
                content => {
                  that.renderConversations(content)
                }
              )
            })
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.confirm-button {
  font-size: $uni-font-size-lg;
  width: 200rpx;
  margin: 0 auto;
}
</style>
