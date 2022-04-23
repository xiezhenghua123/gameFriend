/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-21 15:55:12
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 15:51:52
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
    'group/me/:uid',
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

const getGroupDetail = id => {
  return request(
    'get',
    'group/:groupId',
    {},
    {
      params: {
        groupId: id
      }
    }
  )
}

const deleteGroupUser = (uid, friend, groupId) => {
  return request(
    'delete',
    'group/person/del/:uid',
    { friend: friend, groupId: groupId.toString() },
    {
      params: {
        uid: uid
      }
    }
  )
}

const addGroupUser = (uid, friend, groupId) => {
  return request(
    'post',
    'group/add/:uid',
    { friend: friend, groupId: groupId.toString() },
    {
      params: {
        uid: uid
      }
    }
  )
}

const delGroup = (uid, groupId) => {
  return request(
    'delete',
    'group/del/:uid',
    { groupId: groupId },
    {
      params: {
        uid: uid
      }
    }
  )
}

export {
  login,
  getFriendsList,
  getGroupList,
  createGroup,
  getGroupDetail,
  deleteGroupUser,
  addGroupUser,
  delGroup
}
