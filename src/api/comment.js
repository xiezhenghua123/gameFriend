/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 15:13:24
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 19:21:18
 */
import request from './request/index.js'

const getInvitationComment = id => {
  return request(
    'get',
    'posts/:id/comment',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const replyComment = (id, data) => {
  return request('post', 'posts/comment/:id/reply', data, {
    params: {
      id: id
    }
  })
}

const delReply = id => {
  return request(
    'delete',
    'posts/comment/:id/reply',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const releaseComment = (id, data) => {
  return request('post', 'posts/:id/comment', data, {
    params: {
      id: id
    }
  })
}

const delComment = id => {
  return request(
    'delete',
    'posts/comment/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

export {
  getInvitationComment,
  replyComment,
  releaseComment,
  delComment,
  delReply
}
