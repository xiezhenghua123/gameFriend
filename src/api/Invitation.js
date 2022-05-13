/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 14:52:35
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 18:56:25
 */
import request from './request/index'

const addInvitation = data => {
  return request('post', 'posts/add', data)
}

const editInvitation = (id, data) => {
  return request('put', 'posts/:id', data, {
    params: {
      id: id
    }
  })
}

const delInvitation = (id, data) => {
  return request('delete', 'posts/:id', data, {
    params: {
      id: id
    }
  })
}

const getInvitationList = (page, uuid) => {
  return request(
    'get',
    'posts/list/:page',
    {},
    {
      params: {
        page: page
      },
      query: {
        uid: uuid
      }
    }
  )
}

const getInvitationDetails = (id, uid) => {
  return request(
    'get',
    '/posts/:id',
    {},
    {
      params: {
        id: id
      },
      query: {
        uid: uid
      }
    }
  )
}

const collect = data => {
  return request('post', 'collection/post', data)
}

const cancelCollect = (pid, uuid) => {
  return request(
    'delete',
    'collection/post/:id',
    { postId: pid },
    {
      params: {
        id: uuid
      }
    }
  )
}

const getMyCollect = id => {
  return request(
    'get',
    'collection/post/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const getMyRelease = id => {
  return request(
    'get',
    'posts/me/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

export {
  addInvitation,
  editInvitation,
  getInvitationList,
  delInvitation,
  getInvitationDetails,
  collect,
  cancelCollect,
  getMyCollect,
  getMyRelease
}
