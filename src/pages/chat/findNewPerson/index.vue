<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 16:27:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 11:01:09
-->
<template>
  <view class="m-10">
    <toast></toast>
    <view class="flex mb-10">
      <view class="label">电话号码：</view
      ><u-input v-model="tel" placeholder="请输入电话号码查询用户"></u-input>
    </view>
    <u-button
      text="搜索用户"
      type="primary"
      size="large"
      @click="find"
    ></u-button>
    <u-divider></u-divider>
    <view v-if="person.length">
      <view
        class="user-item mb-10"
        v-for="item in person"
        :key="item.uuid"
        @click="toPersonDetail"
      >
        <view class="flex">
          <div class="user-item-avatar">
            <image :src="item.avatar" />
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ item.name }}</span>
          </div>
        </view>
        <view class="button" @click.stop="add(item.openid)">
          <u-button text="添加" type="primary"></u-button>
        </view>
      </view>
    </view>
    <view v-else style="text-align: center"> 无搜索用户 </view>
  </view>
</template>
<script>
import { findPerson, addFriend } from '@/api/user.js'
import { successToast, errorToast } from '@/components/toast/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tel: '',
      person: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    toPersonDetail() {
      uni.navigateTo({
        url: '/pages/my-information/index?type=other'
      })
    },
    find() {
      if (!this.tel) {
        errorToast('请输入电话号码再查询！')
        return
      }
      findPerson(this.tel).then(({ data }) => {
        this.person = data
      })
    },
    add(id) {
      if (id == this.userInfo.uuid) {
        errorToast('不能添加自己！')
        return
      }
      addFriend(this.userInfo.uuid, {
        friend: id
      }).then(data => {
        successToast('添加好友通知已发送！')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20rpx;
  &-avatar {
    width: 96rpx;
    height: 96rpx;
    overflow: hidden;
    position: relative;
    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &-info {
    padding: 20rpx;
    font-weight: bold;
    color: #262628;
    font-size: 30rpx;
  }
}
</style>
