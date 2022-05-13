/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-03 18:57:44
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 10:08:07
 */
import request from './request'

const add = data => {
  return request('post', 'tip/add', data)
}

export { add }
