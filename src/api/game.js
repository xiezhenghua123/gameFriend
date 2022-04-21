/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-20 23:03:42
 */
import request from './request'
const getJobList = page => {
  return request(
    'get',
    'game/list/:page',
    {},
    {
      params: {
        page: page
      }
    }
  )
}
export { getJobList }
