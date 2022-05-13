/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-21 15:55:12
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 17:45:00
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

const findPerson = phone => {
  return request(
    'get',
    'friend/search',
    {},
    {
      query: {
        phone: phone
      }
    }
  )
}

const addFriend = (uid, data) => {
  return request('post', 'friend/add/:uid', data, {
    params: {
      uid: uid
    }
  })
}

const friendsNotice = uid => {
  return request(
    'get',
    'friend/notice/:uid',
    {},
    {
      params: {
        uid: uid
      }
    }
  )
}

const addFriendConfirm = (uid, data) => {
  return request('put', 'friend/:uid', data, {
    params: {
      uid: uid
    }
  })
}

const delFriend = (uid, data) => {
  return request('delete', 'friend/del/:uid', data, {
    params: {
      uid: uid
    }
  })
}

const confirmPhone = data => {
  return request('post', 'authenticate', data)
}

const edit = (id, data) => {
  return request('put', ':id/update', data, {
    params: {
      id: id
    }
  })
}

const getPersonData = id => {
  return request(
    'get',
    'user/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const getRecommandData = id => {
  return request(
    'get',
    'viewShow',
    {},
    {
      query: {
        id: id
      }
    }
  )
}

export {
  getRecommandData,
  login,
  getFriendsList,
  getGroupList,
  createGroup,
  getGroupDetail,
  deleteGroupUser,
  addGroupUser,
  delGroup,
  findPerson,
  addFriend,
  friendsNotice,
  addFriendConfirm,
  delFriend,
  confirmPhone,
  edit,
  getPersonData
}
