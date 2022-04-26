<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 17:05:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-26 21:04:03
-->
<template>
  <view style="margin-bottom: 120rpx">
    <u-toast ref="uToast" style="z-index: 999"></u-toast>
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
    <u-modal
      :show="editShow"
      title="编辑帖子"
      :showConfirmButton="fasle"
      closeOnClickOverlay
    >
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
      <u-modal
        :show="replyShow"
        :title="'回复' + replyContianer.name"
        showCancelButton
        confirmText="回复"
        closeOnClickOverlay
        @confirm="replyConfirm"
        @cancel="replyShow = false"
      >
        <u-input v-model="content" border="surround"></u-input>
      </u-modal>
      <view v-for="(item, index) in comments" :key="index">
        <comment-template
          :initData="item"
          :position="index"
          @delReply="delReply"
        >
          <template #del>
            <view class="flex">
              <u-button
                type="primary"
                text="回复"
                size="mini"
                @click="reply(item.fromName, item.id, item.fromId, item.toId)"
              ></u-button>
              <view class="ml-10" v-if="userInfo.uuid == item.toId">
                <u-button
                  type="error"
                  text="删除"
                  size="mini"
                  @click="delComment(item.id)"
                >
                </u-button>
              </view>
            </view>
          </template>
        </comment-template>
      </view>
      <view class="answer m-10">
        <u-input
          v-model="answerData"
          clearable
          confirmType="send"
          class="answer-input"
          holdKeyboard
        ></u-input>
        <view class="answer-btn ml-10">
          <u-button text="评论" type="primary" @click="comment"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getInvitationDetails, editInvitation } from '@/api/Invitation.js'
import {
  getInvitationComment,
  replyComment,
  delComment,
  releaseComment,
  delReply
} from '@/api/comment.js'
import { mapState } from 'vuex'
import releaseTemplate from '../release/release-template/index.vue'

export default {
  components: {
    releaseTemplate
  },
  data() {
    return {
      replyShow: false,
      editShow: false,
      answerData: '',
      favorite: false,
      comments: [],
      initData: {},
      id: '',
      replyContianer: {
        name: '',
        fromId: '',
        id: '',
        toId: ''
      },
      content: ''
    }
  },
  onLoad({ id }) {
    this.id = id
    getInvitationDetails(id).then(({ data }) => {
      this.initData = data
    })
    this.getComments()
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    isMyself() {
      return this.initData.publisher === this.userInfo.uuid
    }
  },
  methods: {
    delReply(id) {
      console.log(id)
      delReply(id).then(() => {
        this.$refs.uToast.show({
          message: '删除回复成功！',
          type: 'success'
        })
        this.getComments()
      })
    },
    replyConfirm() {
      if (this.content == '') {
        this.$refs.uToast.show({
          message: '请输入内容',
          type: 'error'
        })
        return
      }
      replyComment(this.replyContianer.id, {
        fromId: this.replyContianer.fromId,
        toId: this.replyContianer.toId,
        content: this.content
      }).then(() => {
        this.$refs.uToast.show({
          message: '回复评论成功',
          type: 'success'
        })
        this.getComments()
        this.replyShow = false
      })
    },
    reply(name, id, fromId, toId) {
      this.replyShow = true
      this.content = ''
      this.replyContianer.name = name
      this.replyContianer.id = id
      this.replyContianer.fromId = fromId
      this.replyContianer.toId = toId
    },
    delComment(id) {
      delComment(id).then(() => {
        this.$refs.uToast.show({
          message: '删除评论成功',
          type: 'success'
        })
        this.getComments()
      })
    },
    getComments() {
      getInvitationComment(this.id).then(({ data }) => {
        this.comments = data.list
      })
    },
    comment() {
      if (this.answerData == '') {
        this.$refs.uToast.show({
          message: '请输入内容',
          type: 'error'
        })
        return
      }
      releaseComment(this.id, {
        fromId: this.userInfo.uuid,
        content: this.answerData
      }).then(({ data }) => {
        this.$refs.uToast.show({
          message: '评论成功',
          type: 'success'
        })
        this.getComments()
      })
    },
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
