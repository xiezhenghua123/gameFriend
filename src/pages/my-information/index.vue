<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-04 15:28:59
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-11 17:34:38
-->

<template>
  <view class="content">
    <toast></toast>
    <view class="top p-10 border-b">
      <view class="flex">
        <view class="u-upload" v-if="!otherPerson">
          <u-upload
            maxCount="1"
            :fileList="previewFile"
            name="avatar"
            previewFullImage
            @delete="deletePic"
            @afterRead="afterRead"
            accept="image"
          ></u-upload>
        </view>
        <view v-else>
          <u-avatar :src="initData.avatar"></u-avatar>
        </view>
        <view class="ml-10">
          <view class="name">{{ initData.name }}</view>
        </view>
      </view>
    </view>
    <view class="center pl-10 pr-10 pt-10">
      <u-form
        :model="initData"
        labelWidth="auto"
        labelPosition="left"
        :rules="rules"
        ref="form"
      >
        <u-form-item prop="name" label="昵称：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.name"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="sex" label="性别：" borderBottom required>
          <view v-if="otherPerson">
            <text>{{ initData.sex }}</text>
          </view>
          <view @click="sexShow = true" v-else class="flex">
            <u--input
              v-model="initData.sex"
              disabled
              placeholder="请选择性别"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-action-sheet
              :show="sexShow"
              :actions="sexArray"
              title="请选择性别"
              @close="sexShow = false"
              @select="sexSelect"
              closeOnClickOverlay
            >
            </u-action-sheet>
          </view>
        </u-form-item>
        <u-form-item label="手机号:" prop="phone" required>
          <u--input
            placeholder="请输入手机号"
            border="none"
            :disabled="otherPerson"
            v-model="initData.phone"
          ></u--input>
        </u-form-item>
        <u-form-item prop="age" label="年龄：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            :disabled="otherPerson"
            v-model="initData.age"
          ></u-input>
        </u-form-item>
        <u-form-item prop="college" label="年级：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            :disabled="otherPerson"
            v-model="initData.college"
          ></u-input>
        </u-form-item>

        <u-form-item prop="specialty" label="专业：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.specialty"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="school" label="学校：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.school"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <u-form-item prop="well" label="擅长：" borderBottom required>
          <u-input
            placeholder="未填写"
            border="none"
            v-model="initData.well"
            :disabled="otherPerson"
          ></u-input>
        </u-form-item>
        <view class="details-box">
          <u-form-item prop="introduction" label="简介：" required>
            <u--textarea
              v-model="initData.introduction"
              :disabled="otherPerson"
              count
              maxlength="1000"
            ></u--textarea>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <view class="bottom p-10" v-if="type === 'mySelf'" @click="edit">
      <u-button text="保存修改" type="primary" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'other'" @click="add">
      <u-button text="发送好友申请" type="primary" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'del'" @click="del">
      <u-button text="删除好友" type="error" size="large"></u-button>
    </view>
    <view class="bottom p-10" v-if="type === 'relation'" @click="relation">
      <u-button text="发送消息" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
import { delFriend, addFriend, edit, getPersonData } from '@/api/user.js'
import { successToast, errorToast } from '../../components/toast/index.js'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      rules: {
        name: {
          required: true,
          message: '请输入昵称',
          trigger: ['blur', 'change']
        },
        phone: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: ['blur', 'change']
          },
          {
            type: 'number',
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value)
            },
            message: '手机号码格式错误',
            trigger: ['blur', 'change']
          }
        ],
        sex: {
          required: true,
          max: 1,
          message: '请选择性别',
          trigger: ['blur', 'change']
        },
        age: {
          required: true,
          message: '请输入年龄',
          trigger: ['blur', 'change']
        },
        age: {
          required: true,
          message: '请输入年级',
          trigger: ['blur', 'change']
        },
        specialty: {
          required: true,
          message: '请输入专业',
          trigger: ['blur', 'change']
        },
        school: {
          required: true,
          message: '请输入学校',
          trigger: ['blur', 'change']
        },
        well: {
          required: true,
          message: '请输入擅长特点',
          trigger: ['blur', 'change']
        },
        introduction: {
          required: true,
          message: '请输入个人简介',
          trigger: ['blur', 'change']
        }
      },
      sexArray: [{ name: '男' }, { name: '女' }],
      sexShow: false,
      type: 'mySelf',
      uuid: '',
      initData: {
        avatar: '',
        name: '',
        sex: '',
        age: '',
        college: '',
        specialty: '',
        school: '',
        well: '',
        phone: '',
        well: '',
        introduction: ''
      }
    }
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    previewFile() {
      return this.initData.avatar ? [{ url: this.initData.avatar }] : []
    },
    otherPerson() {
      return this.type !== 'mySelf'
    }
  },
  onLoad(options) {
    this.type = options.type
    this.uuid = options.id
    getPersonData(this.uuid).then(({ data }) => {
      this.initData = data
    })
  },
  onReady() {
    if (
      this.type === 'other' ||
      this.type === 'del' ||
      this.type === 'relation'
    ) {
      uni.setNavigationBarTitle({
        title: this.initData.name
      })
    }
  },

  methods: {
    ...mapActions('appState', ['setUserInfo']),
    sexSelect(index) {
      this.initData.sex = index.name
      this.sexShow = false
    },
    afterRead(file, lists, name) {
      const that = this
      uni.uploadFile({
        url: 'https://gamefriend.jsky31.cn/api/image',
        filePath: file.file.url,
        name: 'image',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function ({ data }) {
          that.initData.avatar = JSON.parse(data).data
        }
      })
    },
    deletePic(file, lists, name) {
      this.initData.avatar = ''
    },
    add() {
      addFriend(this.userInfo.uuid, {
        friend: this.uuid
      }).then(data => {
        successToast('添加好友通知已发送！')
      })
    },
    relation() {
      this.$methods.chat.enterChat(this.uuid, 'private', this)
    },
    del() {
      let imService = getApp().globalData.imService
      delFriend(imService.currentUser.uuid, { friend: this.uuid }).then(() => {
        imService.friends = imService.friends.filter(item => {
          return item.uuid != this.uuid
        })
        successToast('删除成功！')
        uni.switchTab({
          url: '/pages/message/index',
          success() {
            let page = getCurrentPages().pop() //当前页面
            if (page == undefined || page == null) return
            page.onLoad() //或者其它操作
          }
        })
      })
    },
    edit() {
      if (!this.initData.avatar) {
        errorToast('请上传头像！')
      }
      this.$refs.form.validate().then(vaild => {
        if (vaild) {
          edit(this.userInfo.openid, this.initData).then(() => {
            this.setUserInfo(this.initData)
            successToast('修改成功！')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-upload {
  flex: 0 1 auto;
  ::v-deep .u-upload__wrap__preview__image {
    border-radius: 50%;
  }
}
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
