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
        <view>
          <view style="color: bbb"> 详细内容填上指导老师会更好哦！ </view>
        </view>
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
      <u-form-item
        prop="subject"
        label="赛事科目："
        required
        @click="subjectShow = true"
        :closeOnClickOverlay="true"
        :closeOnClickAction="true"
      >
        <u--input
          v-model="form.subject"
          placeholder="请选择赛事科目"
          disabled
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
        <u-action-sheet
          :show="subjectShow"
          :actions="subjectArray"
          title="请选择赛事级别"
          @close="subjectShow = false"
          @select="subjectSelect"
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
          img: '',
          subject: ''
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
        },
        subject: {
          required: true,
          message: '请选择赛事科目',
          trigger: 'blur'
        }
      },
      levelShow: false,
      subjectShow: false,
      subjectArray: [
        {
          name: '数学建模竞赛'
        },
        {
          name: '物理竞赛'
        },
        {
          name: '电子竞赛'
        },
        {
          name: '创新创业大赛'
        },
        {
          name: '市场调研大赛'
        },
        {
          name: '程序设计大赛'
        },
        {
          name: '法庭模拟大赛'
        }
      ],
      levelArray: [{ name: '校级' }, { name: '省级' }, { name: '国家级' }],
      form: {
        title: '',
        content: '',
        theme: '',
        level: '',
        img: '',
        subject: ''
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
    subjectSelect(index) {
      this.form.subject = index.name
      this.subjectShow = false
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
