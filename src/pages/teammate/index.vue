<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:51:38
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-15 00:51:35
-->
<template>
  <view>
    <view class="m-10" v-if="isLogin">
      <view class="hot-game box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">热门比赛</view>
        </view>
        <u-swiper
          :list="list1"
          keyName="image"
          @click="clickToMatchDetails"
        ></u-swiper>
      </view>
      <view class="relation box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">与我相关</view>
        </view>
        <u-scroll-list v-if="relationData.length">
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
        <u-empty v-else></u-empty>
      </view>
      <view class="study box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">学习资源推荐</view>
        </view>
        <u-scroll-list v-if="studyInformation.length">
          <view class="content-box">
            <view
              class="content-item p-10"
              v-for="item in studyInformation"
              :key="item.id"
            >
              <view class="person">
                <view class="font-weight font-16">{{ item.name }}</view>
              </view>
              <view
                style="
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <view style="margin-bottom: 8rpx">{{ item.subject }}</view>
                <view class="check" @click="downLoad(item.url)"> 下载</view>
              </view>
            </view>
          </view>
        </u-scroll-list>
        <u-empty text="暂无资源推荐" v-else></u-empty>
      </view>
      <view class="find box">
        <view class="title-box mb-10">
          <view class="left mr-10"></view>
          <view class="name">寻友广场</view>
        </view>
        <view v-if="data.length">
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
        <u-empty v-else></u-empty>
      </view>
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getRecommandData } from '@/api/user.js'
import { getInvitationList } from '@/api/Invitation.js'
import { getBanList, getStudyList } from '@/api/common.js'
import { getDetailById } from '@/api/game.js'

export default {
  data() {
    return {
      demoAvatar: require('@/static/logo.png'),
      status: 'loadmore',
      title: 'Hello',
      list1: [],
      relationData: [],
      findDataPage: 1,
      findData: [],
      studyInformation: []
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
    downLoad(url) {
      const isImgRex = /(\.jpg)|(\.jpeg)|(\.png)/i
      const isImg = isImgRex.test(url)
      uni.showLoading({
        title: '下载中',
        success() {
          uni.downloadFile({
            url: url,
            success({ tempFilePath, statusCode }) {
              console.log(tempFilePath)
              if (statusCode == '200') {
                uni.hideLoading()
                if (isImg) {
                  uni.previewImage({
                    urls: [url]
                  })
                } else {
                  wx.openDocument({
                    filePath: tempFilePath,
                    showMenu: true
                  })
                }
              }
            }
          })
        }
      })
    },
    async init() {
      this.findData = await this.getFindList(1) //获取寻友广场数据
      getBanList(1).then(({ data }) => {
        this.list1 = data.bannerList
      })
      getRecommandData(this.userInfo.uuid).then(({ data }) => {
        this.relationData = data
      })
      getStudyList(this.userInfo.uuid).then(({ data }) => {
        this.studyInformation = data
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
    async clickToMatchDetails(index) {
      //关注比赛无法获取item，只能通过此方法
      const id = this.list1[index].game_id
      let item = (await getDetailById(this.userInfo.openid, id)).data
      item = { ...item, img: JSON.parse(item.img)[0] }
      uni.navigateTo({
        url: `/pages/index/details/index?data=${JSON.stringify(item)}`
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
