/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-06 23:27:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-21 19:33:55
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
    url: path
  })
}

chat.connect = (self, userInfo) => {
  if (self.goEasy.getConnectionStatus() === 'disconnected') {
    getApp().globalData.imService = new IMService(self.goEasy, self.GoEasy)
    getApp().globalData.imService.connect(userInfo)
  }
}

export default chat
