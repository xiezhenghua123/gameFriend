/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 19:18:52
 */
import request from './request'
const getJobList = (page, uid) => {
  return request(
    'get',
    'game/list/:page',
    {},
    {
      params: {
        page: page
      },
      query: {
        uid: uid
      }
    }
  )
}

//关注比赛
const collect = data => {
  return request('post', 'collection/game', data)
}

const cancelCollect = (gid, uid) => {
  return request(
    'delete',
    'collection/game/:id',
    { gameId: gid },
    {
      params: {
        id: uid
      }
    }
  )
}
export { getJobList, collect, cancelCollect }
