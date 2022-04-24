<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-07 17:14:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 00:07:58
-->
<template>
  <view>
    <view class="group-member">
      <view
        class="member"
        v-for="(member, key) in users"
        :key="key"
        @click="clickToDetils(member.uuid)"
      >
        <image :src="member.avatar" class="group-member__item"> </image>
        <text> {{ member.name }}</text>
      </view>
      <view class="addGroupPerson" @click="optionGroupPerson('add')">
        <u-icon name="plus-circle" size="40"></u-icon>
      </view>
      <view
        class="addGroupPerson"
        @click="optionGroupPerson('remove')"
        v-if="userInfo.uuid == create_id"
      >
        <u-icon name="minus-circle" size="40"></u-icon>
      </view>
    </view>
    <view class="m-10" v-if="userInfo.uuid == create_id">
      <u-button type="error" text="解散此群" @click="removeGroup"></u-button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { delGroup } from '@/api/user.js'
export default {
  name: 'member',
  data() {
    return {
      users: {},
      create_id: ''
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad() {
    //对话数据
    // let groupId = getApp().globalData.groupId
    this.create_id = getApp().globalData.group.create_userId
    this.users = getApp().globalData.group.userList
    uni.setNavigationBarTitle({
      title: '成员（' + (Object.keys(this.users).length || 0) + '）'
    })
  },
  methods: {
    clickToDetils(id) {
      let isFriend = getApp().globalData.imService.friends.some(item => {
        return item.uuid == id
      })
      uni.navigateTo({
        url: `/pages/my-information/index?id=${id}&type=${
          isFriend ? 'relation' : 'other'
        }`
      })
    },
    removeGroup() {
      const that = this
      uni.showModal({
        title: '确认移除此群聊？',
        success(res) {
          if (res.confirm) {
            delGroup(that.userInfo.uuid, getApp().globalData.group.uuid).then(
              data => {
                let imService = getApp().globalData.imService
                imService.groups = imService.groups.filter(item => {
                  return item.uuid != getApp().globalData.group.uuid
                })
                uni.switchTab({
                  url: '/pages/message/index',
                  success() {
                    let page = getCurrentPages().pop() //当前页面
                    if (page == undefined || page == null) return
                    page.onLoad() //或者其它操作
                  }
                })
              }
            )
          }
        }
      })
    },
    optionGroupPerson(type) {
      uni.navigateTo({
        url: `/pages/chat/groupAddPerson/index?type=${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.group-member {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .member {
    padding: 20rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .addGroupPerson {
    margin-left: 30rpx;
  }
}
.group-member__item {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  margin-bottom: 20rpx;
}
</style>
