<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-02 10:18:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 17:59:06
-->
<template>
  <div>
    <view v-if="initData.length">
      <view
        v-for="item in initData"
        :key="item.id"
        class="content p-10"
        @click="clickToDetails(item)"
      >
        <img
          :src="item.img"
          alt=""
          class="img"
          @click.stop="preview(item.img)"
        />
        <view class="title">
          {{ item.name }}
        </view>
        <view class="sign_up_time">
          报名截止时间：{{ item.sign_up_time }}
        </view>
        <view class="game_time"> 比赛开始时间：{{ item.game_time }} </view>
        <view class="organizer"> 主办方：{{ item.organizer }} </view>
        <view class="bottom flex">
          <span class="mr-10">收藏 {{ item.collections }}</span
          >|<span class="mr-10 ml-10">{{ item.level }}</span
          >|<span class="mr-10 ml-10">{{ item.subject }}</span>
        </view>
      </view>
    </view>
    <u-empty v-else></u-empty>
  </div>
</template>
<script>
export default {
  props: {
    initData: {
      type: Object
    }
  },
  methods: {
    preview(url) {
      uni.previewImage({
        urls: [url]
      })
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/index/details/index?id=${item.id}&content=${item.content}&isCollection=${item.isCollection}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
