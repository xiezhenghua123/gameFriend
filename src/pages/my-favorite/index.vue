<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 17:55:06
-->
<template>
  <view class="content">
    <view v-for="item in findData" :key="item.id">
      <game-template
        :item="item"
        @click.native="clickToDetails"
      ></game-template>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      findData: [
        {
          id: '1',
          avatarUrl: require('static/logo.png'),
          username: '哈哈怪',
          type: '国家级比赛',
          title: '2020年全国大学生创新大赛',
          details: '本科！湘大最好！时间充裕！创新思维！',
          imageUrl: require('static/logo.png'),
          number: 9,
          time: '2020-06-17 16:42:41',
        },
        {
          id: '2',
          avatarUrl: require('static/logo.png'),
          username: '哈哈怪',
          type: '国家级比赛',
          title: '2020年全国大学生创新大赛',
          details: '本科！湘大最好！时间充裕！创新思维！',
          imageUrl: require('static/logo.png'),
          number: 9,
          time: '2020-06-17 16:42:41',
        },
      ],
    }
  },
  onLoad() {},
  methods: {
    clickToDetails() {
      uni.navigateTo({
        url: '/pages/game-details/index',
      })
    },
  },
}
</script>

<style></style>
