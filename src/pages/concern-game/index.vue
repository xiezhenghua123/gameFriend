<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:52:09
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 18:40:56
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
        return this.data
          .map(item => {
            return { ...item, img: JSON.parse(item.img)[0], isCollection: 1 }
          })
          .filter(item => {
            return item.status == 1
          })
      } else {
        return []
      }
    }
  },
  onLoad() {},
  onShow() {
    this.init()
  },
  methods: {
    init() {
      getMyCollect(this.userInfo.uuid).then(({ data }) => {
        this.data = data
      })
    }
  }
}
</script>

<style></style>
