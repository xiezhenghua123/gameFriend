/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-20 21:01:31
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-21 19:54:53
 */

const defaultToast = config => {
  getApp().globalData.toast.show({
    ...config
  })
}

const successToast = (message, config) => {
  getApp().globalData.toast.show({
    type: 'success',
    message: message,
    ...config
  })
}

const errorToast = (message, config) => {
  getApp().globalData.toast.show({
    type: 'error',
    message: message,
    ...config
  })
}

export { defaultToast, successToast, errorToast }
