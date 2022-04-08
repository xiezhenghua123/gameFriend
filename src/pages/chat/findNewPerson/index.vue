<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 16:27:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 16:43:49
-->
<template>
  <view class="m-10">
    <view class="flex mb-10">
      <view class="label">电话号码：</view
      ><u-input v-model="tel" placeholder="请输入电话号码查询用户"></u-input>
    </view>
    <u-button text="搜索用户" type="primary" size="large"></u-button>
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
        <view class="button">
          <u-button text="添加" type="primary"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tel: '',
      person: [
        {
          uuid: '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
          name: 'Juanita',
          password: '123',
          avatar: '/static/images/Avatar-4.png',
        },
      ],
    }
  },
  methods: {
    toPersonDetail() {
      uni.navigateTo({
        url: '/pages/my-information/index?type=other',
      })
    },
  },
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
