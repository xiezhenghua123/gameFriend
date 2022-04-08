<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 16:51:33
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 16:54:00
-->
<template>
  <view class="m-10">
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
    <view>
      <u-button text="邀请" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
import restApi from '@/goEasy/lib/restapi'
export default {
  data() {
    return {
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
