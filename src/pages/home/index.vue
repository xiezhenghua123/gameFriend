<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:51:47
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 16:20:37
-->
<template>
  <view class="content">
    <view v-if="isLogin">
      <view class="top" @click="uploadAvatar">
        <view class="message">
          <u-avatar size="60" :src="userInfo.avatar"></u-avatar>
          <view class="m_right">
            <view class="message_name">{{ userInfo.name }}</view>
            <view class="message_identity"> | 信管 | 湘潭大学 </view>
          </view>
        </view>
        <view>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="divider">
        <u-divider></u-divider>
      </view>
      <block v-for="item in feature_data" :key="item.key">
        <view @click="clickFeature(item.key)" class="content_every">
          <view class="feature">
            <view class="left">
              <i
                class="iconfont"
                :style="{ color: item.iconColor, 'font-style': 'normal' }"
                :class="[item.icon, 'feature_logo']"
              ></i>
              <text class="feature_name">{{ item.name }}</text>
            </view>
            <view class="right">
              <u-icon name="arrow-right"></u-icon>
            </view>
          </view>
          <view class="line">
            <u-line margin="10rpx 0 10rpx 0"></u-line>
          </view>
        </view>
      </block>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { feature } from './data.js'
export default {
  data() {
    return {
      feature_data: feature
    }
  },
  onLoad() {},
  computed: {
    ...mapState('appState', ['isLogin', 'userInfo'])
  },
  methods: {
    clickFeature(key) {
      uni.navigateTo({
        url: `/pages/${key}/index`
      })
    },
    uploadAvatar() {
      uni.chooseImage({
        count: 1,
        success(path) {
          console.log(path.tempFilePaths)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
