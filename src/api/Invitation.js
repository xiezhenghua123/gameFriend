/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 14:52:35
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-24 18:59:51
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

const getInvitationList = page => {
  return request(
    'get',
    'posts/list/:page',
    {},
    {
      params: {
        page: page
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

export {
  addInvitation,
  editInvitation,
  getInvitationList,
  delInvitation,
  getInvitationDetails
}
