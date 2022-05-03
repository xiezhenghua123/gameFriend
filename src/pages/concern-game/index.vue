<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:52:09
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-02 11:26:15
-->
<template>
  <view>
    <view v-if="data.length">
      <match-template :initData="gameListFormter"></match-template>
    </view>
    <u-empty v-else></u-empty>
  </view>
</template>

<script>
import { getMyCollect } from '@/api/game.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      data: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    gameListFormter() {
      if (this.data.length) {
        return this.data.map(item => {
          return { ...item, img: JSON.parse(item.img)[0] }
        })
      } else {
        return []
      }
    }
  },
  onLoad() {
    getMyCollect(this.userInfo.uuid).then(({ data }) => {
      this.data = data
    })
  },
  methods: {}
}
</script>

<style></style>
