<template>
  <div>
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
          disabled
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
        <u-button
          type="primary"
          :text="type === 'publish' ? '发布' : '确认'"
          @click="submit"
        ></u-button>
      </u-form-item>
    </u--form>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'publish'
    },
    initData: {
      type: Object,
      default() {
        return {
          title: '',
          content: '',
          theme: '',
          level: '',
          img: ''
        }
      }
    }
  },
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
    previewFile() {
      return this.form.img ? [{ url: this.form.img }] : []
    }
  },
  watch: {
    initData: {
      handler(val) {
        if (JSON.stringify(val) !== '{}') this.form = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(vaild => {
        if (vaild) {
          this.$emit('getData', this.form)
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
        url: 'https://gamefriend.jsky31.cn/api/image',
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
