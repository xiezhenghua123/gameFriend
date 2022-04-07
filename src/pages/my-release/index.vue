<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 17:03:20
-->
<template>
  <view class="content">
    <view v-for="item in findData" :key="item.id">
      <u-swipe-action>
        <u-swipe-action-item :options="options">
          <game-template :item="item"></game-template>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          text: '取消发布',
          style: {
            backgroundColor: '#ccc',
            marginLeft: '10px',
          },
        },
      ],
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
  methods: {},
}
</script>

<style></style>
