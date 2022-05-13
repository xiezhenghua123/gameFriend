<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-02 10:18:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 12:26:49
-->
<template>
  <div>
    <view v-if="data.length">
      <view
        v-for="(item, index) in data"
        :key="item.id"
        class="content p-10"
        @click.native="clickToDetails(index)"
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
  data() {
    return {
      data: []
    }
  },
  props: {
    initData: {
      type: Array
    }
  },
  watch: {
    initData: {
      handler(val) {
        this.data = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    preview(url) {
      uni.previewImage({
        urls: [url]
      })
    },
    clickToDetails(index) {
      //关注比赛无法获取item，只能通过此方法
      const item = this.data[index]
      uni.navigateTo({
        url: `/pages/index/details/index?data=${JSON.stringify(item)}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
