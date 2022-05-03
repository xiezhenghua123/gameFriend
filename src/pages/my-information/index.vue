<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:28:59
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 18:53:33
-->

<template>
  <view class="content">
    <toast></toast>
    <view class="top p-10 border-b">
      <view class="flex">
        <u-avatar :src="initData.imgUrl" size="55"></u-avatar>
        <view class="ml-10">
          <view class="name">{{ initData.username }}</view>
          <view class="sign">
            <u-input
              v-model="initData.sign"
              placeholder="个性签名"
              border="none"
              fontSize="12"
              :disabled="otherPerson"
            ></u-input>
          </view>
        </view>
      </view>
    </view>
    <view class="center pl-10 pr-10 pt-10">
      <u-form :model="initData.formData" labelWidth="auto" labelPosition="left">
        <u-form-item prop="username" label="昵称：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.username"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="sex" label="性别：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.sex"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="age" label="年龄：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            :disabled="otherPerson"
            v-model="initData.formData.age"
          ></u-input>
        </u-form-item>
        <u-form-item prop="grade" label="年级：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            :disabled="otherPerson"
            v-model="initData.formData.grade"
          ></u-input>
        </u-form-item>

        <u-form-item prop="major" label="专业：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.major"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="school" label="学校：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.school"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="well" label="擅长：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.well"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <view class="details-box">
          <u-form-item prop="details" label="简介：">
            <u--textarea
              v-model="initData.formData.details"
              :disabled="otherPerson"
              count
              maxlength="1000"
            ></u--textarea>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <view class="bottom p-10" v-if="type === 'mySelf'">
      <u-button text="保存修改" type="primary" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'other'" @click="add">
      <u-button text="发送好友申请" type="primary" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'del'" @click="del">
      <u-button text="删除好友" type="error" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'relation'" @click="relation">
      <u-button text="发送消息" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
import { delFriend, addFriend } from '@/api/user.js'
import { successToast } from '../../components/toast/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      type: 'mySelf',
      uuid: '',
      initData: {
        imgUrl: require('static/logo.png'),
        username: '爸爸',
        sign: 'xxx',
        formData: {
          username: '爸爸',
          sex: '男',
          age: '20',
          grade: '大一',
          major: '信管',
          school: '湘潭大学',
          well: '打球',
          details: 'xxxxx'
        }
      }
    }
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    otherPerson() {
      return this.type !== 'mySelf'
    }
  },
  onLoad(options) {
    this.type = options.type
    this.uuid = options.id
  },
  onReady() {
    if (
      this.type === 'other' ||
      this.type === 'del' ||
      this.type === 'relation'
    ) {
      uni.setNavigationBarTitle({
        title: 'xxx'
      })
    }
  },

  methods: {
    add() {
      addFriend(this.userInfo.uuid, {
        friend: this.uuid
      }).then(data => {
        successToast('添加好友通知已发送！')
      })
    },
    relation() {
      this.$methods.chat.enterChat(this.uuid, 'private', this)
    },
    del() {
      let imService = getApp().globalData.imService
      delFriend(imService.currentUser.uuid, { friend: this.uuid }).then(() => {
        imService.friends = imService.friends.filter(item => {
          return item.uuid != this.uuid
        })
        successToast('删除成功！')
        uni.switchTab({
          url: '/pages/message/index',
          success() {
            let page = getCurrentPages().pop() //当前页面
            if (page == undefined || page == null) return
            page.onLoad() //或者其它操作
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .top {
    .name {
      font-weight: bold;
      font-size: 15px;
    }
  }
}
.border-b {
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
}
::v-deep .details-box {
  .u-form-item__body {
    flex-direction: column !important;
    .u-form-item__body__right {
      margin-top: 8px;
    }
  }
}
</style>
