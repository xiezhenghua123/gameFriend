/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-06 23:27:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 22:49:10
 */
/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-05 22:07:22
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 20:20:29
 */

import IMService from '@/goEasy/lib/imservice'

const chat = function () {}

chat.enterChat = (uuid, type, self) => {
  //进入私聊
  let path =
    type === self.GoEasy.IM_SCENE.PRIVATE
      ? '/pages/chat/privateChat/privateChat?to=' + uuid
      : '/pages/chat/groupChat/groupChat?to=' + uuid
  uni.navigateTo({
    url: path,
  })
}

chat.connect = self => {
  let currentUser = uni.getStorageSync('currentUser')
  if (self.goEasy.getConnectionStatus() === 'disconnected') {
    getApp().globalData.imService = new IMService(self.goEasy, self.GoEasy)
    getApp().globalData.imService.connect(currentUser)
  }
}

export default chat
