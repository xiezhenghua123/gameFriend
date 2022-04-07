/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-05 15:01:39
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 22:51:11
 */
import GoEasy from 'goeasy'

const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //若是新加坡区域：singapore.goeasy.io
  appkey: 'BC-86b2e6947c0246a69964411038bd11f9',
  modules: ['im'], //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
})

goEasy.onClickNotification(message => {
  let currentUrl
  const routes = getCurrentPages()

  if (routes && routes.length) {
    const curRoute = routes[routes.length - 1].route
    const curParam = routes[routes.length - 1].options
    currentUrl = '/' + curRoute + `?to=${curParam.to}`
  }

  let newUrl
  switch (message.toType) {
    case GoEasy.IM_SCENE.PRIVATE:
      newUrl = '/pages/chat/privateChat/privateChat?to=' + message.senderId
      break
    case GoEasy.IM_SCENE.GROUP:
      newUrl = '/pages/chat/groupChat/groupChat?to=' + message.groupId
      break
  }

  if (currentUrl !== newUrl) {
    uni.navigateTo({
      url: newUrl,
    })
  }
})

export { goEasy, GoEasy }
