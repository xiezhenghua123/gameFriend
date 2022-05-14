/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 19:38:28
 */
import request from './request'
const getJobList = (page, data) => {
  return request('post', 'game/list/:page', data, {
    params: {
      page: page
    }
  })
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

const getMyCollect = id => {
  return request(
    'get',
    'collection/game/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

//推荐算法打入数据
const dataIn = data => {
  return request('post', 'setData', data)
}

const getDetailById = (uid, gameId) => {
  return request(
    'get',
    'game/:id',
    {},
    {
      query: {
        uid: uid
      },
      params: {
        id: gameId
      }
    }
  )
}

export {
  getJobList,
  collect,
  cancelCollect,
  getMyCollect,
  dataIn,
  getDetailById
}
