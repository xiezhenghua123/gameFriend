/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-23 15:13:24
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-23 15:24:12
 */
import request from './common.js'

const getInvitationComment = id => {
  request(
    'get',
    'post/:id/comment',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const replyComment = (id, data) => {
  request('post', 'post/comment/:id/reply', data, {
    params: {
      id: id
    }
  })
}

const delReply = id => {
  request('delete', 'post/comment/:id/reply', data, {
    params: {
      id: id
    }
  })
}

const releaseComment = (id, data) => {
  request('post', 'post/:id/comment', data, {
    params: {
      id: id
    }
  })
}

const delComment = id => {
  request(
    'delete',
    'post/comment/:id',
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
