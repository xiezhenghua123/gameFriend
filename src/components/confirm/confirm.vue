<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 20:42:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 10:53:42
-->
<template>
  <view>
    <view class="confirm-button" :style="{ 'margin-top': marT + 'rpx' }">
      <u-button size="large" type="primary" @click="confirm">
        点击登录
      </u-button>
      <u-modal :show="show" title="填写手机号" :showConfirmButton="false">
        <u--form :model="form" ref="uForm" :rules="rules" labelWidth="auto">
          <u-form-item label="手机号:" prop="phone" required>
            <u--input
              placeholder="请输入手机号"
              border="surround"
              v-model="form.phone"
            ></u--input>
          </u-form-item>
          <u-form-item>
            <u-button
              type="primary"
              text="提交"
              @click="confirmPhone"
            ></u-button>
          </u-form-item>
        </u--form>
      </u-modal>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import restApi from '@/goEasy/lib/restapi'
import renderConversations from '@/pages/minix/renderConversations'
import { login, confirmPhone } from '@/api/user.js'

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
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  data() {
    return {
      show: false,
      userInfo: {},
      form: {
        phone: ''
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: ['blur', 'change']
          },
          {
            type: 'number',
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value)
            },
            message: '手机号码格式错误',
            trigger: ['blur', 'change']
          }
        ]
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
    confirmPhone() {
      this.$refs.uForm.validate().then(vaild => {
        if (vaild) {
          confirmPhone({
            openid: this.userInfo.uuid,
            phone: this.form.phone
          }).then(() => {
            this.remember({ ...this.userInfo, phone: this.form.phone })
            this.show = false
          })
        }
      })
    },
    //记录登陆状态
    async remember(userInfo) {
      this.setLogin(true)
      await this.setUserInfo(userInfo)
      this.$emit('isLogin', true)
      this.$methods.chat.connect(this, userInfo)
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, content => {
        this.renderConversations(content)
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
            }).then(data => {
              that.$set(that.userInfo, 'name', data.data.name)
              that.$set(that.userInfo, 'avatar', data.data.avatar)
              that.$set(that.userInfo, 'uuid', data.data.openid)
              that.$set(that.userInfo, 'status', data.data.status)
              if (data.code == 0) {
                that.remember({
                  ...data.data,
                  uuid: data.data.openid
                })
              } else {
                that.show = true
              }
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
