/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-04 12:18:04
 */
import { request } from './request'
const getJobList = (data = {}) => {
  return request({
    url: '/vs/ajaxGetList',
    method: 'GET',
    data: data,
  })
}
export { getJobList }
