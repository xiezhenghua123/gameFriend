<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-07 14:49:31
-->
<template>
  <view class="content">
    <view v-if="findData.length">
      <view v-for="item in findData" :key="item.id">
        <game-template
          :item="item"
          @click.native="clickToDetails(item)"
        ></game-template>
      </view>
    </view>
    <u-empty v-else></u-empty>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getMyCollect } from '@/api/Invitation.js'
export default {
  data() {
    return {
      findData: []
    }
  },
  onLoad() {},
  onShow() {
    this.init()
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    init() {
      getMyCollect(this.userInfo.uuid).then(({ data }) => {
        this.findData = data
      })
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/game-details/index?id=${item.id}`
      })
    }
  }
}
</script>

<style></style>
