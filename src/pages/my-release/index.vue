<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 19:17:17
-->
<template>
  <view class="content">
    <toast></toast>
    <view v-for="item in findData" :key="item.id">
      <u-swipe-action>
        <u-swipe-action-item :options="options" @click="del(item.id)">
          <game-template
            :item="item"
            @click.native="clickToDetails(item.id)"
          ></game-template>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getInvitationList, delInvitation } from '@/api/Invitation.js'
import { successToast } from '@/components/toast/index.js'
export default {
  data() {
    return {
      options: [
        {
          text: '取消发布',
          style: {
            backgroundColor: '#ccc',
            marginLeft: '10px'
          }
        }
      ],
      findData: []
    }
  },
  onLoad() {
    this.init()
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    clickToDetails(id) {
      uni.navigateTo({
        url: `/pages/game-details/index?id=${id}`
      })
    },
    async init() {
      this.findData = await this.getFindList(1) //获取寻友广场数据
    },
    del(id) {
      delInvitation(id).then(async () => {
        successToast('取消成功！')
        this.findData = await this.getFindList(1)
      })
    },
    getFindList(page) {
      return new Promise(async (res, rej) => {
        res(
          (await getInvitationList(page)).data.postList.filter(item => {
            return item.publisher === this.userInfo.uuid
          })
        )
      })
    }
  }
}
</script>

<style></style>
