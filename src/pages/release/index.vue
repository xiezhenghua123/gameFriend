<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 16:30:10
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 17:59:00
-->
<template>
  <div>
    <view v-if="isLogin" class="m-10">
      <u--form
        :model="form"
        :rules="rules"
        ref="form"
        labelPosition="top"
        labelWidth="auto"
      >
        <u-form-item prop="img" label="赛事图片：" required>
          <u-upload
            maxCount="1"
            :fileList="previewFile"
            name="img"
            @delete="deletePic"
            @afterRead="afterRead"
            previewFullImage
            @clickPreview="clickPreview"
          ></u-upload>
        </u-form-item>
        <u-form-item prop="title" label="名称：" required>
          <u-input v-model="form.title"></u-input>
        </u-form-item>
        <u-form-item prop="theme" label="主题：" required>
          <u-input v-model="form.theme"></u-input>
        </u-form-item>
        <u-form-item prop="content" label="详细内容：" required>
          <u--textarea
            v-model="form.content"
            placeholder="请输入详细内容"
          ></u--textarea>
        </u-form-item>
        <u-form-item
          prop="level"
          label="赛事级别："
          required
          @click="levelShow = true"
          :closeOnClickOverlay="true"
          :closeOnClickAction="true"
        >
          <u--input
            v-model="form.level"
            placeholder="请选择赛事级别"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :show="levelShow"
            :actions="levelArray"
            title="请选择赛事级别"
            @close="levelShow = false"
            @select="levelSelect"
          >
          </u-action-sheet>
        </u-form-item>
        <u-form-item>
          <u-button type="primary" text="发布" @click="submit"></u-button>
        </u-form-item>
      </u--form>
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { addInvitation } from '@/api/Invitation.js'
export default {
  data() {
    return {
      rules: {
        img: {
          required: true,
          message: '请上传图片',
          trigger: ['blur', 'change']
        },
        title: {
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        },
        theme: {
          required: true,
          message: '请输入主题',
          trigger: 'blur'
        },
        content: {
          required: true,
          message: '请输入详情',
          trigger: 'blur'
        },
        level: {
          required: true,
          message: '请选择赛事级别',
          trigger: 'blur'
        }
      },
      levelShow: false,
      levelArray: [{ name: '校级' }, { name: '省级' }, { name: '国家级' }],
      form: {
        title: '',
        content: '',
        theme: '',
        level: '',
        img: ''
      }
    }
  },
  onLoad() {
    this.$refs.form.setRules(this.rules)
  },
  computed: {
    ...mapState('appState', ['isLogin','userInfo']),
    previewFile() {
      return this.form.img ? [{ url: this.form.img }] : []
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(vaild => {
        if (vaild) {
          const data = {
            ...this.form,
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
        }
      })
    },
    levelSelect(index) {
      this.form.level = index.name
      this.levelShow = false
    },
    deletePic() {
      this.form.img = ''
      this.$refs.form.validateField('img')
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
          that.form.img = JSON.parse(data).data
        }
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
