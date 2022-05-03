<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 18:24:02
-->
<template>
  <view>
    <toast></toast>
    <view v-if="isLogin" class="box">
      <match-template :initData="gameListFormter"></match-template>
      <u-loadmore :status="status" />
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getJobList } from '@/api/game.js'
import minix from '../minix/index'

export default {
  mixins: [minix],
  data() {
    return {
      show: true,
      page: 1,
      status: 'loadmore',
      gameList: []
    }
  },
  onPullDownRefresh() {
    this.page = 1
    this.getList(this.page).then(({ data }) => {
      this.gameList = data.gameList
      uni.stopPullDownRefresh()
    })
  },
  onLoad() {
    if (this.isLogin) {
      this.getList(this.page).then(({ data }) => {
        this.gameList = data.gameList
        if (data.total < 2) {
          this.status = 'nomore'
        }
      })
    }
  },
  onReachBottom() {
    this.status = 'loading'
    this.getList(++this.page).then(({ data }) => {
      if (data.gameList.length) {
        this.gameList.push(data.gameList)
        this.status = 'loadmore'
      } else {
        this.status = 'nomore'
      }
    })
  },

  methods: {
    // clickToDetails(item) {
    //   uni.navigateTo({
    //     url: `/pages/index/details/index?id=${item.id}&content=${item.content}&isCollection=${item.isCollection}`
    //   })
    // },
    judgeLogin(status) {
      if (status) {
        this.getList(this.page).then(({ data }) => {
          this.gameList = data.gameList
        })
      }
    },
    getList(page) {
      return new Promise((resolve, rej) => {
        getJobList(page, this.userInfo.uuid)
          .then(res => {
            resolve(res)
          })
          .catch(err => {})
      })
    }
  },
  computed: {
    ...mapState('appState', ['isLogin', 'userInfo']),
    gameListFormter() {
      if (this.gameList.length) {
        return this.gameList.map(item => {
          return { ...item, img: JSON.parse(item.img)[0] }
        })
      } else {
        return []
      }
    }
  }
}
</script>
