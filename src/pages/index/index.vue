<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 17:36:41
-->
<template>
  <view>
    <toast></toast>
    <view v-if="isLogin" class="box">
      <view class="filter">
        <sl-filter
          :menuList="menuList"
          @result="result"
          :topFixed="true"
          themeColor="#3c9cff"
          ref="slFilter"
        ></sl-filter>
      </view>
      <match-template :initData="gameListFormter"></match-template>
      <u-loadmore :status="status" />
    </view>
    <confirm v-else @isLogin="judgeLogin"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getJobList } from '@/api/game.js'
import minix from '../minix/index'

export default {
  mixins: [minix],
  data() {
    return {
      menuList: [
        {
          title: '竞赛级别',
          key: 'level',
          isMutiple: true,
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 0
            },
            {
              title: '国家级',
              value: '国家级'
            },
            {
              title: '省级',
              value: '省级'
            },
            {
              title: '校级',
              value: '校级'
            }
          ]
        },

        {
          title: '竞赛科目',
          key: 'subject',
          isMutiple: true,
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 0
            },
            {
              title: '数学建模竞赛',
              value: '数学建模竞赛'
            },
            {
              title: '物理竞赛',
              value: '物理竞赛'
            },
            {
              title: '电子竞赛',
              value: '电子竞赛'
            },
            {
              title: '创新创业大赛',
              value: '创新创业大赛'
            },
            {
              title: '市场调研大赛',
              value: '市场调研大赛'
            },
            {
              title: '程序设计大赛',
              value: '程序设计大赛'
            },
            {
              title: '法庭模拟大赛',
              value: '法庭模拟大赛'
            }
          ]
        }
      ],
      show: true,
      page: 1,
      status: 'loadmore',
      gameList: [],
      level: 0,
      subject: 0
    }
  },
  onPullDownRefresh() {
    this.page = 1
    // this.getList(this.page).then(({ data }) => {
    //   this.gameList = data.gameList

    // })
    this.$refs.slFilter.resetSelectToDefault(result => {
      this.level = 0
      this.subject = 0
      this.init()
      uni.stopPullDownRefresh()
    })
  },
  onLoad() {},
  onShow() {
    this.page = 1
    this.init()
  },
  onReachBottom() {
    this.status = 'loading'
    this.getList(++this.page).then(({ data }) => {
      if (data.gameList.length) {
        this.gameList.push(data.gameList)
        this.status = 'loadmore'
      } else {
        this.status = 'nomore'
      }
    })
  },

  methods: {
    // clickToDetails(item) {
    //   uni.navigateTo({
    //     url: `/pages/index/details/index?id=${item.id}&content=${item.content}&isCollection=${item.isCollection}`
    //   })
    // },
    result({ level, subject }) {
      console.log(level, subject)
      if (!level.length || (level.length == 1 && level[0] == 0)) {
        this.level = 0
      } else {
        if (level[0] == 0) {
          this.level = [...level.slice(1, level.length)]
        } else {
          this.level = [...level]
        }
      }
      if (!subject.length || (subject.length == 1 && subject[0] == 0)) {
        this.subject = 0
      } else {
        if (subject[0] == 0) {
          this.subject = [...subject.slice(1, subject.length)]
        } else {
          this.subject = [...subject]
        }
      }
      this.page = 1
      this.init()
    },
    init() {
      if (this.isLogin) {
        this.getList(this.page).then(({ data }) => {
          this.gameList = data.gameList
          console.log(this.gameList)
          if (this.gameList < 2) {
            this.status = 'nomore'
          }
        })
      }
    },
    judgeLogin(status) {
      if (status) {
        this.getList(this.page).then(({ data }) => {
          this.gameList = data.gameList
        })
      }
    },
    getList(page) {
      return new Promise((resolve, rej) => {
        getJobList(page, {
          uid: this.userInfo.uuid,
          level: this.level,
          subject: this.subject
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {})
      })
    }
  },
  computed: {
    ...mapState('appState', ['isLogin', 'userInfo']),
    gameListFormter() {
      if (this.gameList.length) {
        return this.gameList
          .map(item => {
            return { ...item, img: JSON.parse(item.img)[0] }
          })
          .filter(item => {
            return item.status == 1
          })
      } else {
        return []
      }
    }
  }
}
</script>
