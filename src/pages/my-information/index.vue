<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:28:59
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 21:09:44
-->

<template>
  <view class="content">
    <view class="top p-10 border-b">
      <view class="flex">
        <u-avatar :src="initData.imgUrl" size="55"></u-avatar>
        <view class="ml-10">
          <view class="name">{{ initData.username }}</view>
          <view class="sign">
            <u-input
              v-model="initData.sign"
              placeholder="个性签名"
              border="none"
              fontSize="12"
            ></u-input>
          </view>
        </view>
      </view>
    </view>
    <view class="center pl-10 pr-10 pt-10">
      <u-form :model="initData.formData" labelWidth="auto" labelPosition="left">
        <u-form-item prop="username" label="昵称：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.username"
          ></u-input>
        </u-form-item>
        <u-form-item prop="sex" label="性别：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.sex"
          ></u-input>
        </u-form-item>
        <u-form-item prop="age" label="年龄：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.age"
          ></u-input>
        </u-form-item>
        <u-form-item prop="grade" label="年级：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.grade"
          ></u-input>
        </u-form-item>

        <u-form-item prop="major" label="专业：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.major"
          ></u-input>
        </u-form-item>
        <u-form-item prop="school" label="学校：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.school"
          ></u-input>
        </u-form-item>
        <u-form-item prop="well" label="擅长：" borderBottom>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.formData.well"
          ></u-input>
        </u-form-item>
        <view class="details-box">
          <u-form-item prop="details" label="简介：">
            <u--textarea
              v-model="initData.formData.details"
              count
              maxlength="1000"
            ></u--textarea>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <view class="bottom p-10">
      <u-button text="保存修改" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      initData: {
        imgUrl: require('static/logo.png'),
        username: '爸爸',
        sign: 'xxx',
        formData: {
          username: '爸爸',
          sex: '男',
          age: '20',
          grade: '大一',
          major: '信管',
          school: '湘潭大学',
          well: '打球',
          details: 'xxxxx',
        },
      },
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.content {
  .top {
    .name {
      font-weight: bold;
      font-size: 15px;
    }
  }
}
.border-b {
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
}
::v-deep .details-box {
  .u-form-item__body {
    flex-direction: column !important;
    .u-form-item__body__right {
      margin-top: 8px;
    }
  }
}
</style>
