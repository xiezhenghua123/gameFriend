/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-07 23:06:12
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 22:58:36
 */
import { friendsNotice, getFriendsList, getGroupList } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    renderConversations(content) {
      // this.conversations = content.conversations || []
      let unreadTotal = content.unreadTotal
      this.setUnreadAmount(unreadTotal)
      this.initFriendsAndGropps()
    },
    async initFriendsAndGropps() {
      //获取好友列表
      let imService = getApp().globalData.imService
      //数据字段清洗
      let friends = (await getFriendsList(this.userInfo.uuid)).data.map(
        item => {
          return { uuid: item.openid, name: item.name, avatar: item.avatar }
        }
      )
      imService.setUser(friends)
      //获取群聊列表
      let groups = (await getGroupList(this.userInfo.uuid)).data.map(item => {
        return {
          uuid: item.id,
          name: item.name,
          avatar: item.img,
          create_userId: item.user_id
        }
      })

      imService.setGroup(groups)
    },
    async setUnreadAmount(unreadTotal) {
      const { data } = await friendsNotice(this.userInfo.uuid)
      const number = data.length + unreadTotal
      if (number > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: number.toString()
        })
      } else {
        uni.removeTabBarBadge({
          index: 3
        })
      }
    }
  }
}
