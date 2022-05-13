<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:20:43
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 19:32:01
-->
<template>
  <view class="content">
    <toast></toast>
    <view v-if="findData.length">
      <view v-for="item in findData" :key="item.id">
        <u-swipe-action>
          <u-swipe-action-item :options="options" @click="del(item.id)">
            <game-template
              :item="item"
              @click.native="clickToDetails(item.id, item.isCollection)"
            ></game-template>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>
    <u-empty v-else> </u-empty>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getMyRelease, delInvitation } from '@/api/Invitation.js'
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
    clickToDetails(id, isCollection) {
      uni.navigateTo({
        url: `/pages/game-details/index?id=${id}&isCollection=${isCollection}`
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
        let { data } = await getMyRelease(this.userInfo.uuid)
        data = data
          .filter(item => {
            return item.status == 1
          })
          .map(item => {
            return { ...item, avatar: this.userInfo.avatar }
          })

        res(data)
      })
    }
  }
}
</script>

<style></style>
