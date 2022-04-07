<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 19:20:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 19:38:14
-->
<template>
  <view class="box">
    <view class="m-10">
      <view class="top">
        <view class="person">
          <u-avatar :src="initData.avatarUrl" size="50"></u-avatar>
          <view class="name ml-10">{{ initData.username }}</view>
        </view>
        <view class="position">{{ '--' + initData.position + '楼--' }}</view>
      </view>
      <view class="content mt-10">{{ initData.content }}</view>
      <view class="time mt-10">{{ initData.time }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'comment-template',
  props: {
    initData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .person {
    display: flex;
    align-items: center;
  }
}
.content {
  font-weight: bold;
}
.time {
  text-align: right;
}
.box {
  border-bottom: 2px solid rgba(66, 61, 61, 0.3);
}
</style>
