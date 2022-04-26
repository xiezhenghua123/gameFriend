<template>
  <scroll-view class="conversations" scroll-y="true">
    <view v-if="conversations.length != 0 || friendNoticeTotal != 0">
      <view class="notice-item" v-if="friendNoticeTotal" @click="toNotice">
        添加好友通知
        <view class="number">{{ friendNoticeTotal }}</view>
      </view>
      <view
        class="scroll-item"
        v-for="(conversation, key) in conversations"
        :key="key"
      >
        <view class="item-head">
          <image :src="conversation.data.avatar" class="head-icon"></image>
          <view class="item-head_unread" v-if="conversation.unread">{{
            conversation.unread
          }}</view>
        </view>
        <view class="scroll-item_info">
          <view class="item-info-top">
            <text class="item-info-top_name">{{ conversation.data.name }}</text>
            <view class="item-info-top_time">{{
              formatDate(conversation.lastMessage.timestamp)
            }}</view>
          </view>
          <view class="item-info-bottom">
            <view
              class="item-info-bottom-item"
              @click="navigateToChat(conversation)"
            >
              <view
                class="item-info-top_content"
                v-if="conversation.lastMessage.type == 'text'"
                >{{ conversation.lastMessage.payload.text }}</view
              >
              <view
                class="item-info-top_content"
                v-else-if="conversation.lastMessage.type == 'video'"
                >[视频消息]</view
              >
              <view
                class="item-info-top_content"
                v-else-if="conversation.lastMessage.type == 'audio'"
                >[语音消息]</view
              >
              <view
                class="item-info-top_content"
                v-else-if="conversation.lastMessage.type == 'image'"
                >[图片消息]</view
              >
              <view
                class="item-info-top_content"
                v-else-if="conversation.lastMessage.type == 'file'"
                >[文件消息]</view
              >
              <view class="item-info-top_content" v-else>[[未识别内容]]</view>
              <view
                class="item-info-bottom_action"
                @click.stop="showAction(conversation)"
              ></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="no-conversation" v-else> 当前没有会话 </view>
    <view class="action-container" v-if="action.show">
      <view class="layer" @click="action.show = false"></view>
      <view class="action-box">
        <view class="action-item" @click="topConversation">{{
          action.conversation.top ? '取消置顶' : '置顶聊天'
        }}</view>
        <view class="action-item" @click="removeConversation">删除聊天</view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import IMService from '@/goEasy/lib/imservice'
import { friendsNotice } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'contacts',
  data() {
    return {
      unreadTotal: 0,
      friendNoticeTotal: 0,
      friendNotice: [],
      conversations: [],
      action: {
        conversation: null,
        show: false
      }
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  mounted() {
    this.getAddFriendsMessage()
    let self = this
    //加载会话列表
    this.goEasy.im.latestConversations({
      onSuccess: function (result) {
        let content = result.content
        self.renderConversations(content)
      },
      onFailed: function (error) {
        //获取失败
        console.log(error)
        console.log(
          '失败获取最新会话列表, code:' +
            error.code +
            ' content:' +
            error.content
        )
      }
    })
  },
  methods: {
    toNotice() {
      uni.navigateTo({
        url: `/pages/chat/addFrendsNotice/index?data=${JSON.stringify(
          this.friendNotice
        )}`
      })
    },
    async getAddFriendsMessage() {
      const { data } = await friendsNotice(this.userInfo.uuid)
      this.friendNotice = data
      this.friendNoticeTotal = data.length
    },
    topConversation() {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      let conversation = this.action.conversation
      let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败'
      this.action.show = false
      if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
        this.goEasy.im.topPrivateConversation({
          userId: conversation.userId,
          top: !conversation.top,
          onSuccess: function () {
            uni.hideLoading()
          },
          onFailed: function (error) {
            uni.hideLoading()
            uni.showToast({
              title: failedDescription,
              icon: 'none'
            })
            console.log(error)
          }
        })
      } else {
        this.goEasy.im.topGroupConversation({
          groupId: conversation.groupId,
          top: !conversation.top,
          onSuccess: function () {
            uni.hideLoading()
          },
          onFailed: function (error) {
            uni.hideLoading()
            uni.showToast({
              title: failedDescription,
              icon: 'none'
            })
            console.log(error)
          }
        })
      }
    },
    removeConversation() {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      let failedDescription = '删除失败'
      let conversation = this.action.conversation
      this.action.show = false
      if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
        this.goEasy.im.removePrivateConversation({
          userId: conversation.userId,
          onSuccess: function () {
            uni.hideLoading()
          },
          onFailed: function (error) {
            uni.hideLoading()
            uni.showToast({
              title: failedDescription,
              icon: 'none'
            })
            console.log(error)
          }
        })
      } else {
        this.goEasy.im.removeGroupConversation({
          groupId: conversation.groupId,
          onSuccess: function () {
            uni.hideLoading()
          },
          onFailed: function (error) {
            uni.hideLoading()
            uni.showToast({
              title: failedDescription,
              icon: 'none'
            })
            console.log(error)
          }
        })
      }
    },
    renderConversations(content) {
      let friends = getApp().globalData.imService.friends
      this.conversations =
        content.conversations.filter(item => {
          return friends.some(i => {
            return item.userId == i.uuid
          })
        }) || []
      let unreadTotal = content.unreadTotal
      this.setUnreadAmount(unreadTotal)
    },
    setUnreadAmount(unreadTotal) {
      this.unreadTotal = unreadTotal + this.friendNoticeTotal
      if (this.unreadTotal > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: this.unreadTotal.toString()
        })
      } else {
        uni.removeTabBarBadge({
          index: 3
        })
      }
    },
    navigateToChat(conversation) {
      let path =
        conversation.type === this.GoEasy.IM_SCENE.PRIVATE
          ? '../chat/privateChat/privateChat?id=' + conversation.userId
          : '../chat/groupChat/groupChat?id=' + conversation.groupId
      uni.navigateTo({
        url: path
      })
    },
    showAction(conversation) {
      this.action.conversation = conversation
      this.action.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
.notice-item {
  height: 100rpx;
  display: flex;
  align-items: center;
  padding-left: 64rpx;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  .number {
    padding: 6rpx;
    background-color: #ee593c;
    color: #ffffff;
    font-size: 24rpx;
    line-height: 28rpx;
    border-radius: 24rpx;
    min-width: 24rpx;
    min-height: 24rpx;
    text-align: center;
    margin-right: 40rpx;
  }
}
.conversations {
  width: 750rpx;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
}
.conversations .scroll-item {
  height: 152rpx;
  display: flex;
  align-items: center;
  padding-left: 32rpx;
  border-bottom: 1px solid #efefef;
}
.conversations .scroll-item .head-icon {
  width: 100rpx;
  height: 100rpx;
  margin-right: 28rpx;
}
.conversations .scroll-item_info {
  height: 151rpx;
  width: 590rpx;
  padding-right: 32rpx;
  box-sizing: border-box;
}
.conversations .scroll-item_info .item-info-top {
  padding-top: 20rpx;
  height: 60rpx;
  line-height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.conversations .item-info-top_name {
  font-size: 34rpx;
  color: #262628;
}
.conversations .item-info-top_time {
  font-size: 26rpx;
  color: rgba(179, 179, 179, 0.8);
  font-family: Source Han Sans CN;
}
.conversations .item-info-bottom {
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
}
.conversations .item-info-bottom-item {
  display: flex;
  justify-content: space-between;
}
.item-info-bottom .item-info-top_content {
  font-size: 30rpx;
  color: #b3b3b3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-info-bottom .item-info-bottom_action {
  width: 50rpx;
  height: 50rpx;
  font-size: 20rpx;
  background: url('@/static/images/action.png') no-repeat center;
  background-size: 28rpx 30rpx;
}
.no-conversation {
  width: 100%;
  text-align: center;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  color: #9d9d9d;
}
.item-head {
  position: relative;
}
.item-head .item-head_unread {
  padding: 6rpx;
  background-color: #ee593c;
  color: #ffffff;
  font-size: 24rpx;
  line-height: 28rpx;
  border-radius: 24rpx;
  min-width: 24rpx;
  min-height: 24rpx;
  text-align: center;
  position: absolute;
  top: 0;
  right: 15rpx;
}
.action-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-container .layer {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99;
}
.action-box {
  width: 400rpx;
  height: 240rpx;
  background: #ffffff;
  position: relative;
  z-index: 100;
  border-radius: 20rpx;
  overflow: hidden;
}
.action-item {
  text-align: center;
  line-height: 120rpx;
  font-size: 34rpx;
  color: #262628;
  border-bottom: 1px solid #efefef;
}
</style>
