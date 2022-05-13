<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 19:20:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 19:22:43
-->
<template>
  <view class="box comment-box">
    <view class="m-10">
      <view class="comment">
        <view class="top">
          <view class="person">
            <view @click="addPerson(initData.fromId)">
              <u-avatar :src="initData.fromAvatar" size="40"></u-avatar>
            </view>
            <view class="name ml-10">{{ initData.fromName }}</view>
          </view>
          <view class="position">{{ '--' + (position + 1) + '楼--' }}</view>
          <view class="ml-10">
            <slot name="del"></slot>
          </view>
        </view>
        <view class="content mt-10">{{ initData.content }}</view>
        <view class="time mt-10 mb-10">评论于{{ initData.time }}</view>
      </view>
      <view class="replay" v-if="initData.reply.length">
        <view v-for="(item, index) in initData.reply" :key="index">
          <view class="flex" style="justify-content: space-between">
            <view class="flex">
              <view class="name mr-10">{{ item.fromName }}</view>
              <view @click="addPerson(initData.fromId)">
                <u-avatar :src="item.fromAvatar" size="20"></u-avatar>
              </view>
              <view> ：{{ item.content }} </view>
            </view>
            <view v-if="userInfo.uuid == item.fromId">
              <u-button
                type="error"
                size="mini"
                text="删除"
                @click="delReply(item.id)"
              ></u-button>
            </view>
          </view>
          <view>
            <view class="time" style="margin-top: 5px; margin-bottom: 3px"
              >回复于{{ item.time }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// import { delReply } from '@/api/comment.js'
import { mapState } from 'vuex'
// import { successToast } from '@/components/toast/index.js'
export default {
  name: 'comment-template',
  props: {
    initData: {
      type: Object,
      require: true
    },
    position: {
      type: Number
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    addPerson(id) {
      uni.navigateTo({
        url: `/pages/my-information/index?type=other&id=${id}`
      })
    },
    delReply(id) {
      this.$emit('delReply', id)
    }
  }
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
.replay {
  background-color: #efefef;
  padding: 10rpx;
  border-radius: 5px;
}
</style>
