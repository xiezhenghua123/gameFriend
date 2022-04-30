/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 14:52:35
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 19:34:00
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

const getInvitationDetails = id => {
  return request(
    'get',
    '/posts/:id',
    {},
    {
      params: {
        id: id
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
    'collection/resume/:id',
    { postId: pid },
    {
      params: {
        id: uuid
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
  cancelCollect
}
