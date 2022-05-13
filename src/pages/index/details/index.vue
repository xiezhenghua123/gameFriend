<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 18:40:38
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 12:06:50
-->
<template>
  <div class="m-10 content">
    <toast></toast>
    <img :src="item.img" alt="" class="img" @click.stop="preview(item.img)" />
    <view class="title">
      {{ item.name }}
    </view>
    <view class="sign_up_time"> 报名截止时间：{{ item.sign_up_time }} </view>
    <view class="game_time"> 比赛开始时间：{{ item.game_time }} </view>
    <view> 主办方：{{ item.organizer }} </view>
    <view> 赛事详情：{{ content }} </view>
    <view class="bottom flex">
      <span class="mr-10">收藏 {{ item.collections }}</span
      >|<span class="mr-10 ml-10">{{ item.level }}</span
      >|<span class="mr-10 ml-10">{{ item.subject }}</span>
    </view>
    <u-button
      type="primary"
      :text="isCollection == '0' ? '关注' : '取消关注'"
      @click="collectOption"
    >
    </u-button>
  </div>
</template>
<script>
import { cancelCollect, collect, dataIn } from '@/api/game.js'
import { mapState } from 'vuex'
import { successToast } from '../../../components/toast'

export default {
  data() {
    return {
      isCollection: '0',
      content: '',
      id: '',
      item: {}
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad({ data }) {
    console.log(data)
    const initData = JSON.parse(data)
    this.item = initData
    this.id = initData.game_id || initData.id
    this.content = initData.content
    this.isCollection = initData.isCollection
    this.collectionId = initData.collectionId
  },
  methods: {
    collectOption() {
      if (this.isCollection == '0') {
        dataIn({
          openid: this.userInfo.uuid,
          subject: this.item.name,
          gameId: this.id
        }).then(() => {
          console.log('数据打入成功！')
        })
        collect({ gameId: this.id.toString(), uid: this.userInfo.uuid }).then(
          ({ data }) => {
            this.collectionId = data.collectionId
            this.isCollection = '1'
            successToast('关注成功！')
          }
        )
      } else {
        cancelCollect(this.id.toString(), this.collectionId).then(data => {
          this.isCollection = '0'
          successToast('取消关注成功！')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  line-height: 1.5;
  font-size: 30rpx;
  .img {
    width: 100%;
    height: 228rpx;
    border-radius: 2px;
  }
  .title {
    font-weight: bold;
    font-size: 34rpx;
  }
  .organizer,
  .bottom {
    font-size: 24rpx;
    color: rgb(153, 153, 153);
  }
}
</style>
