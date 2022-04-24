<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 16:30:10
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 19:40:31
-->
<template>
  <div>
    <view v-if="isLogin" class="m-10">
      <releaseTemplate @getData="confirm"></releaseTemplate>
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { addInvitation } from '@/api/Invitation.js'
import releaseTemplate from './release-template/index.vue'
export default {
  components: {
    releaseTemplate
  },
  data() {
    return {}
  },
  onLoad() {},
  computed: {
    ...mapState('appState', ['isLogin', 'userInfo'])
  },
  methods: {
    confirm(form) {
      const data = {
        ...form,
        name: this.userInfo.name,
        publisher: this.userInfo.uuid
      }
      addInvitation(data).then(({ data }) => {
        uni.switchTab({
          url: '/pages/teammate/index',
          success() {
            let page = getCurrentPages().pop() //当前页面
            if (page == undefined || page == null) return
            page.onLoad() //或者其它操作
          }
        })
      })
    },
    judgeLogin(status) {
      if (status) {
        this.init()
      }
    },
    init() {},
    clickPreview(url, lists, name) {
      uni.previewImage({
        urls: url
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
