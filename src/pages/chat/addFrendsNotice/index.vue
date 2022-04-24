<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-24 21:15:26
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 22:07:07
-->
<template>
  <div class="m-10">
    <toast></toast>
    <view v-if="person.length">
      <view
        class="user-item p-10"
        v-for="item in person"
        :key="item.uuid"
        @click="toPersonDetail"
      >
        <view class="flex">
          <div class="user-item-avatar">
            <image :src="item.avatar" />
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ item.name }}</span>
          </div>
        </view>
        <view class="button" @click.stop="add(item.openid)">
          <u-button
            :text="addStatus ? '已添加' : '添加'"
            :disabled="addStatus"
            type="primary"
          ></u-button>
        </view>
      </view>
    </view>
  </div>
</template>
<script>
import { addFriendConfirm } from '@/api/user.js'
import { successToast } from '../../../components/toast'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      person: [],
      addStatus: false
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad({ data }) {
    this.person = JSON.parse(data)
  },
  methods: {
    add(id) {
      addFriendConfirm(this.userInfo.uuid, { friend: id }).then(() => {
        successToast('添加成功！')
        this.addStatus = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20rpx;
  border-bottom: 1px solid #efefef;
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
