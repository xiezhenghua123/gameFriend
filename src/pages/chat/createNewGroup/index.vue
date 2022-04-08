<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 15:15:15
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 16:09:54
-->
<template>
  <view class="m-10">
    <view class="group-name mb-10">
      <view class="label">群聊名称：</view><u-input v-model="name"></u-input>
    </view>
    <view>
      <view class="label">群聊成员：</view>
      <checkbox-group @change="checkboxChange">
        <view class="user-item mb-10" v-for="item in friends" :key="item.uuid">
          <checkbox :value="item.uuid"> </checkbox>
          <div class="user-item-avatar">
            <image :src="item.avatar" />
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ item.name }}</span>
          </div>
        </view>
      </checkbox-group>
    </view>
    <view class="mt-10">
      <u-button text="创建群聊" type="primary" size="large"></u-button>
    </view>
  </view>
</template>
<script>
import restApi from '@/goEasy/lib/restapi'
export default {
  data() {
    return {
      name: '',
      selectFriends: [],
      friends: [],
    }
  },
  onShow() {
    this.init()
  },
  methods: {
    init() {
      let currentUser = uni.getStorageSync('currentUser')
      this.friends = restApi.findFriends(currentUser)
    },
    checkboxChange(e) {
      console.log(e.target.value)
      this.selectFriends = e.target.value
    },
  },
}
</script>
<style lang="scss" scoped>
.label {
  font-weight: bold;
  font-size: 32rpx;
  margin: 15rpx 0;
}
.user-item {
  display: flex;
  align-items: center;
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
