<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 17:05:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 20:17:44
-->
<template>
  <view style="margin-bottom: 120rpx">
    <u-toast ref="uToast"></u-toast>
    <view class="top-box m-10">
      <view class="person">
        <u-avatar :src="initData.avatar" size="50"></u-avatar>
        <view class="name ml-10">{{ initData.name }}</view>
      </view>
      <view class="operation-box">
        <view class="collect mr-10">
          <view @click="clickIcon"
            ><u-icon
              :name="favorite ? 'star-fill' : 'star'"
              size="22"
              color="#ff9900"
            ></u-icon
          ></view>
        </view>
        <view class="see-game" v-if="isMyself">
          <u-button
            type="primary"
            text="编辑"
            @click="editShow = true"
          ></u-button>
        </view>
      </view>
    </view>
    <u-modal :show="editShow" title="编辑帖子" :showConfirmButton="fasle">
      <releaseTemplate
        :initData="initData"
        @getData="edit"
        style="width: 100%"
        type="edit"
      ></releaseTemplate>
    </u-modal>
    <view class="content-box">
      <view class="game m-10">
        <img :src="initData.img" alt="" class="game-img" />
        <view class="game-title">{{ initData.title }}</view>
        <view class="game-theme">主题：{{ initData.theme }}</view>
      </view>
      <u-divider lineColor="#ccc"></u-divider>
      <view class="details m-10">
        内容：{{ initData.content }}
        <view class="time mt-10">{{ timeFormat(initData.created_at) }}</view>
      </view>
    </view>
    <view class="comment-box">
      <view class="title pl-10">赛友热评</view>
      <view v-for="item in comments" :key="item.position">
        <comment-template :initData="item"></comment-template>
      </view>
      <view class="answer m-10">
        <u-input
          v-model="answerData"
          clearable
          confirmType="send"
          class="answer-input"
          holdKeyboard
        ></u-input>
        <view class="answer-btn">
          <u-button text="回复" type="primary"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getInvitationDetails, editInvitation } from '@/api/Invitation.js'
import { mapState } from 'vuex'
import releaseTemplate from '../release/release-template/index.vue'

export default {
  components: {
    releaseTemplate
  },
  data() {
    return {
      editShow: false,
      answerData: '',
      favorite: false,
      comments: [
        {
          position: 1,
          avatarUrl: require('static/logo.png'),
          username: '张三',
          time: '2020-06-17 16:42:41',
          content: '测试评论'
        },
        {
          position: 2,
          avatarUrl: require('static/logo.png'),
          username: '张三',
          time: '2020-06-17 16:42:41',
          content: '测试评论'
        }
      ],
      initData: {}
    }
  },
  async onLoad({ id }) {
    const { data } = await getInvitationDetails(id)
    this.initData = data
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    isMyself() {
      return this.initData.publisher === this.userInfo.uuid
    }
  },
  methods: {
    timeFormat(time) {
      return time.replace(/T/g, ' ').replace(/\.[\d]{6}Z/g, '')
    },
    edit(editData) {
      editInvitation(editData.id, editData).then(async () => {
        this.$refs.uToast.show({
          message: '修改成功',
          type: 'success'
        })
        this.editShow = false
        const { data } = await getInvitationDetails(editData.id)
        this.initData = data
      })
    },
    clickIcon() {
      this.favorite = !this.favorite
      if (this.favorite) {
        this.$refs.uToast.show({
          message: '收藏成功！',
          type: 'success'
        })
      } else {
        this.$refs.uToast.show({
          message: '取消收藏成功！',
          type: 'success'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
