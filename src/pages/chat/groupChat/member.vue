<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-07 17:14:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 16:56:05
-->
<template>
  <view class="group-member">
    <view class="member" v-for="(member, key) in users" :key="key">
      <image :src="member.avatar" class="group-member__item"> </image>
      <text> {{ member.name }}</text>
    </view>
    <view class="addGroupPerson" @click="addGroupPerson">
      <u-icon name="plus-circle" size="40"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  name: 'member',
  data() {
    return {
      users: {},
    }
  },
  onLoad(options) {
    //对话数据
    this.users = JSON.parse(options.users)
    uni.setNavigationBarTitle({
      title: '成员（' + (Object.keys(this.users).length || 0) + '）',
    })
  },
  methods: {
    addGroupPerson() {
      uni.navigateTo({
        url: '/pages/chat/groupAddPerson/index',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.group-member {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .member {
    padding: 20rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .addGroupPerson {
    margin-left: 30rpx;
  }
}
.group-member__item {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  margin-bottom: 20rpx;
}
</style>
