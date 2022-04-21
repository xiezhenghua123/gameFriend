<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 19:52:09
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-21 17:31:08
-->
<template>
  <view>
    <u-tabs
      :current="tab"
      :list="list"
      @click="click"
      :scrollable="false"
      :activeStyle="activeStyle"
    ></u-tabs>
    <view v-if="isLogin">
      <view v-if="show">
        <contacts v-if="tab === 1"></contacts>
        <conversations v-else></conversations>
      </view>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import contacts from './contacts/contacts.vue'
import conversations from './conversations/conversations.vue'
import { mapState } from 'vuex'
import minix from '../minix/index'

export default {
  components: { contacts, conversations },
  computed: {
    ...mapState('appState', ['isLogin'])
  },
  mixins: [minix],
  data() {
    return {
      show: true,
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      },
      tab: 0,
      list: [
        {
          name: '会话',
          key: 'conversations'
        },
        {
          name: '队友',
          key: 'contacts'
        }
      ]
    }
  },
  onPullDownRefresh() {
    this.show = false
    this.$nextTick(() => {
      this.show = true
      uni.stopPullDownRefresh()
    })
  },
  methods: {
    click(data) {
      this.tab = data.index
      console.log(data)
    }
  }
}
</script>

<style></style>
