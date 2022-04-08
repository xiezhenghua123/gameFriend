<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:51:38
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-08 15:13:55
-->
<template>
  <view class="m-10">
    <view class="hot-game box">
      <view class="title-box mb-10">
        <view class="left mr-10"></view>
        <view class="name">热门比赛</view>
      </view>
      <u-swiper :list="list1"></u-swiper>
    </view>
    <view class="relation box">
      <view class="title-box mb-10">
        <view class="left mr-10"></view>
        <view class="name">与我相关</view>
      </view>
      <view class="content-box">
        <view class="content-item" v-for="item in relationData" :key="item.id">
          <view class="person">
            <u-avatar :src="item.imageUrl" size="55"></u-avatar>
            <view class="name">{{ item.name }}</view>
          </view>
          <view class="check" @click="toPersonDetail"> 查看</view>
        </view>
      </view>
    </view>
    <view class="find box">
      <view class="title-box mb-10">
        <view class="left mr-10"></view>
        <view class="name">寻友广场</view>
      </view>

      <game-template
        v-for="item in findData"
        :item="item"
        :key="item.id"
        @click.native="clickToDetails"
      ></game-template>
      <u-loadmore
        :status="status"
        loadmore-text="点击加载更多"
        @loadmore="loadmore"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      status: 'loadmore',
      title: 'Hello',
      list1: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
      ],
      relationData: [
        {
          imageUrl: require('static/logo.png'),
          name: '张三',
          id: '1',
        },
        {
          imageUrl: require('static/logo.png'),
          name: '李四',
          id: '2',
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
  methods: {
    toPersonDetail() {
      uni.navigateTo({
        url: '/pages/my-information/index?type=other',
      })
    },
    clickToDetails() {
      uni.navigateTo({
        url: '/pages/game-details/index',
      })
    },
    loadmore() {
      this.status = 'loading'
      setTimeout(() => {
        this.status = 'loadingmore'
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
