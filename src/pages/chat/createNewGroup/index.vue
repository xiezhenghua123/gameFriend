<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-08 15:15:15
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 00:49:39
-->
<template>
  <view class="m-10">
    <toast></toast>
    <view class="group-img mb-10">
      <view class="label">群聊头像：</view>
      <u-upload
        :fileList="previewFile"
        @afterRead="afterRead"
        @delete="deletePic"
        previewFullImage
        @clickPreview="clickPreview"
        :maxCount="1"
        accept="image"
      ></u-upload>
    </view>
    <view class="group-name mb-10">
      <view class="label">群聊名称：</view><u-input v-model="name"></u-input>
    </view>
    <view>
      <view class="label">群聊成员：</view>
      <checkbox-group @change="checkboxChange" v-model="selectFriends">
        <view class="user-item mb-10" v-for="item in friends" :key="item.uuid">
          <checkbox :name="item.uuid" :value="item.uuid"> </checkbox>
          <div class="user-item-avatar">
            <image :src="item.avatar" />
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ item.name }}</span>
          </div>
        </view>
      </checkbox-group>
    </view>
    <view class="mt-10">
      <u-button
        text="创建群聊"
        type="primary"
        size="large"
        @click="createGroup"
      ></u-button>
    </view>
  </view>
</template>
<script>
import { mapState } from 'vuex'
import { createGroup } from '@/api/user.js'
import { successToast, errorToast } from '@/components/toast/index.js'

export default {
  data() {
    return {
      name: '',
      selectFriends: [],
      friends: [],
      imgFile: ''
    }
  },
  onShow() {
    this.init()
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    previewFile() {
      return this.imgFile ? [{ url: this.imgFile }] : []
    }
  },
  methods: {
    createGroup() {
      if (!this.imgFile) {
        errorToast('请上传群头像！')
        return
      }
      if (!this.name) {
        errorToast('请输入群名称！')
        return
      }
      createGroup(this.userInfo.uuid, {
        friends: this.selectFriends,
        groupName: this.name,
        img: this.imgFile
      }).then(({ data }) => {
        if (data) {
          successToast('创建成功！')
          getApp().globalData.imService.groups.push({
            uuid: data.id,
            name: data.name,
            avatar: this.imgFile,
            create_userId: this.userInfo.uuid
          })
          uni.navigateTo({
            url: `/pages/chat/groupChat/groupChat?id=${data.id}&name=${data.name}`
          })
        }
      })
    },
    afterRead(file, lists, name) {
      const that = this
      uni.uploadFile({
        url: 'http://gamefriend.jsky31.cn/api/image',
        filePath: file.file.url,
        name: 'image',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function ({ data }) {
          that.imgFile = JSON.parse(data).data
        }
      })
    },
    deletePic(file, lists, name) {
      this.imgFile = ''
    },
    clickPreview(url, lists, name) {
      uni.previewImage({
        urls: url
      })
    },
    async init() {
      this.friends = getApp().globalData.imService.friends
    },
    checkboxChange({ detail }) {
      this.selectFriends = detail.value
    }
  }
}
</script>
<style lang="scss" scoped>
.label {
  font-weight: bold;
  font-size: 32rpx;
  margin: 15rpx 0;
}
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
