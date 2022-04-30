<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 19:09:04
-->
<template>
  <view>
    <toast></toast>
    <view v-if="isLogin" class="box">
      <view
        v-for="item in gameListFormter"
        :key="item.id"
        class="content p-10"
        @click="clickToDetails(item)"
      >
        <img :src="item.img" alt="" class="img" />
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
      if (data.total) {
        this.gameList.push(data.gameList)
        this.status = 'loadmore'
      } else {
        this.status = 'nomore'
      }
    })
  },

  methods: {
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/index/details/index?id=${item.id}&content=${item.content}&isCollection=${item.isCollection}`
      })
    },
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
      return this.gameList.map(item => {
        return { ...item, img: JSON.parse(item.img)[0] }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
