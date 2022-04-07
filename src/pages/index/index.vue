<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 23:48:02
-->
<template>
  <view>
    <view v-if="isLogin" class="box sk-event-list">
      <u-parse :content="html" @linkTap="linkTap"></u-parse>
      <u-loadmore status="loading" v-show="show" />
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'

import { getJobList } from '@/api/getJobList.js'
import minix from '../minix/index'

export default {
  mixins: [minix],
  data() {
    return {
      show: false,
      html: '',
      // style: {
      //   img: 'height: 55px;width: 55px;',
      // },
      page: 1,
      // list1: [
      //   'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      //   'https://cdn.uviewui.com/uview/swiper/swiper2.png',
      //   'https://cdn.uviewui.com/uview/swiper/swiper3.png',
      // ],
    }
  },
  onLoad() {
    // getJobList({ page: this.page }).then(res => {
    //   this.html = `<div class="sk-event-list v-4-6">${res.data.list}</div>`
    // })
  },
  onReachBottom() {
    // this.show = true
    // this.getList().then(() => {
    //   this.show = false
    // })
  },
  methods: {
    linkTap(obj) {
      console.log(obj)
    },
    // getList() {
    //   return new Promise((resolve, rej) => {
    //     getJobList({ page: ++this.page }).then(res => {
    //       this.html += `<div class="sk-event-list v-4-6">${res.data.list}</div>`
    //       resolve()
    //     })
    //   })
    // },
  },
  computed: {
    ...mapState('appState', ['isLogin']),
  },
}
</script>

<style lang="scss" scoped>
// @import './style.scss';
</style>
