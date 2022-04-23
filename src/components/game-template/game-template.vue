<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 16:34:15
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 18:38:26
-->
<template>
  <view class="find">
    <view class="game-item p-10">
      <view class="top flex">
        <view class="person">
          <u-avatar
            :src="item.avatar ? 'item.avatar' : demoAvatar"
            size="50"
          ></u-avatar>
          <view class="name">{{ item.name }}</view>
        </view>
        <view class="type">{{ item.level }}比赛</view>
      </view>
      <view class="center flex">
        <view class="content">
          <view class="title">{{ item.title }}</view>
          <view class="details">{{ item.theme }}</view>
        </view>
        <img :src="item.img" alt="" class="img" />
      </view>
      <view class="bottom flex">
        <view class="number-box">
          <i class="iconfont icon-yanjing"></i>
          <!-- {{ item.number }} -->
        </view>
        <text>发布于{{ timeFormat(item.created_at) }}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'game-template',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    timeFormat(time) {
      return time.replace(/T/g, ' ').replace(/\.[\d]{6}Z/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.find {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .game-item {
    color: $uni-text-color-placeholder;
    border-bottom: 2px solid #ccc;
    .top {
      .person {
        display: flex;
        align-items: center;
        // font-size: 12px;
        .name {
          margin-left: 5px;
        }
      }
      .type {
        color: rgb(64, 80, 224);
        font-size: 12px;
        border: 1px solid rgb(64, 80, 224);
        padding: 3px 2px;
        border-radius: 5px;
      }
    }
    .center {
      margin-bottom: 5px;
      .content {
        .title {
          color: $uni-text-color;
          font-size: 15px;
          font-weight: bold;
          line-height: 1.6;
        }
      }

      .img {
        width: 100px;
        height: 60px;
      }
    }
    .bottom {
      font-size: 12px;
      .number-box {
        display: flex;
      }
      .iconfont {
        margin-right: 3px;
      }
    }
  }
}
</style>
