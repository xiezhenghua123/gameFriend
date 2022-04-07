<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 21:12:29
-->
<template>
  <view>
    <view class="text-box">
      <u--textarea
        v-model="value"
        placeholder="请在此处写下您对'赛友平台'的意见或建议，您宝贵的反馈是我们前进的方向"
        count
        maxlength="500"
        height="300"
        @confirm="submit"
      ></u--textarea>
    </view>
    <view class="button-bottom">
      <u-button
        type="primary"
        size="large"
        @click="submit"
        text="提交"
      ></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    submit() {
      console.log('提交了建议')
    },
  },
}
</script>

<style lang="scss" scoped>
.text-box {
  margin: 15px;
}
</style>
