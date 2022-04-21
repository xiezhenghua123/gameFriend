/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-21 15:55:12
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-21 20:01:30
 */
import request from './request'

const login = data => {
  return request('post', '/login', data)
}

const getFriendsList = id => {
  return request(
    'get',
    'friend/me/:uid',
    {},
    {
      params: { uid: id }
    }
  )
}

const getGroupList = id => {
  return request(
    'get',
    'group/join/:uid',
    {},
    {
      params: { uid: id }
    }
  )
}

const createGroup = (uid, data) => {
  return request('post', 'group/:uid', data, {
    params: {
      uid: uid
    }
  })
}

export { login, getFriendsList, getGroupList, createGroup }
