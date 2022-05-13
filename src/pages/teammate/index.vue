<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:51:38
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 18:30:49
-->
<template>
  <view>
    <view class="m-10" v-if="isLogin">
      <view class="hot-game box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">热门比赛</view>
        </view>
        <u-swiper :list="list1"></u-swiper>
      </view>
      <view class="relation box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">与我相关</view>
        </view>
        <u-scroll-list>
          <view class="content-box">
            <view
              class="content-item p-10"
              v-for="item in relationData"
              :key="item.openid"
            >
              <view class="person">
                <u-avatar :src="item.avatar" size="55"></u-avatar>
                <view class="name">{{ item.name }}</view>
              </view>
              <view class="check" @click="toPersonDetail(item)"> 查看</view>
            </view>
          </view>
        </u-scroll-list>
      </view>
      <view class="find box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">寻友广场</view>
        </view>
        <game-template
          v-for="item in data"
          :item="item"
          :key="item.id"
          @click.native="clickToDetails(item.id, item.isCollection)"
        ></game-template>
        <u-loadmore
          :status="status"
          loadmore-text="点击加载更多"
          @loadmore="loadmore"
        />
      </view>
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getRecommandData } from '@/api/user.js'
import { getInvitationList } from '@/api/Invitation.js'
import { getBanList } from '@/api/common.js'
export default {
  data() {
    return {
      demoAvatar: require('@/static/logo.png'),
      status: 'loadmore',
      title: 'Hello',
      list1: [],
      relationData: [],
      findDataPage: 1,
      findData: []
    }
  },
  computed: {
    ...mapState('appState', ['isLogin', 'userInfo']),
    data() {
      return this.findData.filter(item => {
        return item.status == 1
      })
    }
  },
  onLoad() {
    this.init()
  },
  onPullDownRefresh() {
    this.init()
    uni.stopPullDownRefresh()
  },
  methods: {
    judgeLogin(status) {
      if (status) {
        this.init()
      }
    },
    async init() {
      this.findData = await this.getFindList(1) //获取寻友广场数据
      getBanList(1).then(({ data }) => {
        console.log(1)
        const array = data.bannerList.map(item => {
          return item.image
        })
        this.list1 = array
      })
      getRecommandData(this.userInfo.uuid).then(({ data }) => {
        this.relationData = data
      })
    },
    getFindList(page) {
      return new Promise(async (res, rej) => {
        res((await getInvitationList(page, this.userInfo.uuid)).data.postList)
      })
    },
    toPersonDetail(item) {
      uni.navigateTo({
        url: `/pages/my-information/index?type=other&id=${item.openid}`
      })
    },
    clickToDetails(id, isCollection) {
      uni.navigateTo({
        url: `/pages/game-details/index?id=${id}&isCollection=${isCollection}`
      })
    },
    loadmore() {
      this.status = 'loading'
      this.getFindList(++this.findDataPage).then(data => {
        if (data.length) {
          this.findData.push(data)
          this.status = 'loadingmore'
        } else {
          this.status = 'nomore'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
