<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 16:51:33
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 14:36:45
-->
<template>
  <view class="m-10">
    <toast></toast>
    <view v-if="friends.length">
      <checkbox-group @change="checkboxChange" v-model="selectFriends">
        <view class="user-item mb-10" v-for="item in friends" :key="item.uuid">
          <checkbox :value="item.uuid"> </checkbox>
          <div class="user-item-avatar">
            <image :src="item.avatar" />
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ item.name }}</span>
          </div>
        </view>
      </checkbox-group>
      <view>
        <u-button
          :text="type === 'add' ? '邀请' : '移除'"
          :type="type === 'add' ? 'primary' : 'error'"
          size="large"
          @click="option"
        ></u-button>
      </view>
    </view>
    <view v-else style="text-align: center">
      {{
        type === 'add'
          ? '暂无好友，请添加好友或您的所有好友已在本群中！'
          : '暂无群成员，请添加群成员'
      }}
    </view>
  </view>
</template>

<script>
// import restApi from '@/goEasy/lib/restapi'
import { mapState } from 'vuex'
import { addGroupUser, deleteGroupUser } from '@/api/user.js'
// import { successToast } from '@/components/toast/index.js'

export default {
  data() {
    return {
      selectFriends: [],
      friends: [],
      type: 'add',
      groupId: ''
    }
  },
  onShow() {
    this.init()
  },
  onLoad(options) {
    this.type = options.type
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    init() {
      uni.setNavigationBarTitle({
        title: this.type === 'add' ? '邀请新成员' : '移除群成员'
      })
      // let currentUser = uni.getStorageSync('currentUser')
      this.groupId = getApp().globalData.group.uuid
      let imService = getApp().globalData.imService
      let groupUser = imService.getGroupUser(this.groupId).filter(item => {
        return this.userInfo.uuid !== item.uuid
      })
      let friends = imService.friends
      if (this.type === 'add') {
        this.friends = friends.filter(item => {
          return !groupUser.some(i => {
            return item.uuid.toString() === i.uuid.toString()
          })
        })
      } else {
        this.friends = groupUser
      }
    },
    checkboxChange({ detail }) {
      this.selectFriends = detail.value
    },
    addUser() {
      return new Promise(async (res, rej) => {
        let resData = []
        for (let i = 0; i < this.selectFriends.length; i++) {
          await addGroupUser(
            this.userInfo.uuid,
            this.selectFriends[i],
            this.groupId
          ).then(({ data }) => {
            resData.push(data)
          })
        }
        res(resData)
      })
    },
    removeUser() {
      return new Promise(async (res, rej) => {
        let resData = []
        for (let i = 0; i < this.selectFriends.length; i++) {
          await deleteGroupUser(
            this.userInfo.uuid,
            this.selectFriends[i],
            this.groupId
          ).then(({ data }) => {
            resData.push(data)
          })
        }
        res(resData)
      })
    },
    option() {
      if (this.type === 'add') {
        this.addUser().then(data => {
          console.log(data)
          uni.navigateTo({
            url: '/pages/chat/groupChat/groupChat?id=' + this.groupId
          })
        })
      } else {
        this.removeUser().then(data => {
          console.log(data)
          uni.navigateTo({
            url: '/pages/chat/groupChat/groupChat?id=' + this.groupId
          })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-item {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  &-avatar {
    width: 96rpx;
    height: 96rpx;
    overflow: hidden;
    position: relative;
    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &-info {
    padding: 20rpx;
    font-weight: bold;
    color: #262628;
    font-size: 30rpx;
  }
}
</style>
