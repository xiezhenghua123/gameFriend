<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 18:40:38
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 19:23:32
-->
<template>
  <div class="m-10">
    <view class="mb-10">
      {{ content }}
    </view>
    <u-button
      type="primary"
      :text="isCollection == '0' ? '关注' : '取消关注'"
      @click="collectOption"
    >
    </u-button>
  </div>
</template>
<script>
import { cancelCollect, collect } from '@/api/game.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollection: '0',
      content: '',
      id: ''
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad({ id, isCollection, content }) {
    this.id = id
    this.content = content
    this.isCollection = isCollection
  },
  methods: {
    collectOption() {
      if (this.isCollection == '0') {
        collect({ gameId: this.id, uid: this.userInfo.uuid }).then(data => {
          this.isCollection = '1'
        })
      } else {
        cancelCollect(this.id, this.userInfo.uuid).then(data => {
          this.isCollection = '0'
        })
      }
    }
  }
}
</script>
