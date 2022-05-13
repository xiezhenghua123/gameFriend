/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 17:10:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 13:29:29
 */

import { apiRoot } from '../requestUrl/index.js'
import ajax from 'uni-ajax'
import { errorToast } from '../../components/toast/index.js'
import store from '../../store/index.js'

const baseConfig = {
  baseURL: apiRoot,
  header: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 60000
}

const setInterceptors = instance => {
  instance.interceptors.request.use(requestInterceptors, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(responseInterceptors, error => {
    if (error.statusCode !== 200) {
      errorToast(`访问出错！${error.statusCode}`)
    }
    return Promise.reject(error)
  })
}

const requestInterceptors = config => {
  console.log(config)
  const repx = /(posts\/add)|(friend\/add)/
  const sameUrl = /comment|reply/
  if (
    (repx.test(config.url) ||
      (sameUrl.test(config.url) && config.method == 'POST')) &&
    store.state.appState.userInfo.status == '1'
  ) {
    wx.showToast({
      title: '已被禁言',
      icon: 'error'
    })
    return Promise.reject('已被禁言')
  }
  return config
}

const responseInterceptors = response => {
  // 需要检查code的接口
  const repx = /\/login/
  if (repx.test(response.config.url)) {
    return response.data
  }
  if (response.data.code != 0) {
    errorToast(response.data.status)
    return Promise.reject(response.data.status)
  }
  return response.data
}

const request = (type, url, data = {}, config) => {
  const options = {
    method: type,
    url: url,
    data: data,
    ...baseConfig,
    ...config
  }
  const instance = ajax.create(options)
  setInterceptors(instance)
  return new Promise(async (res, rej) => {
    await instance()
      .then(data => {
        res(data)
      })
      .catch(err => {
        rej(err)
      })
  })
}
export default request
