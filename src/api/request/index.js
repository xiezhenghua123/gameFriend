/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 17:10:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-03 19:01:07
 */

import { apiRoot } from '../requestUrl/index.js'

const request = config => {
  // 处理 apiUrl
  config.url = apiRoot + config.url
  // config.url = apiRoot
  if (!config.data) config.data = {}
  config.timeout = 300000
  let promise = new Promise(function (resolve, reject) {
    uni.request({
      ...config,
      success(res) {
        resolve(res.data)
      },
      fail(rej) {
        reject(rej)
      },
    })
  })
  return promise
}

export { request }
