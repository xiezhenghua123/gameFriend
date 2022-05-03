<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-02 10:08:04
-->
<template>
  <view class="content">
    <view v-if="findData">
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
  onLoad() {
    getMyCollect(this.userInfo.uuid).then(({ data }) => {
      this.findData = data
    })
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/game-details/index?id=${item.id}`
      })
    }
  }
}
</script>

<style></style>
