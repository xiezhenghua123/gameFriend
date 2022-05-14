/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-21 18:20:33
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 21:34:15
 */
import request from './request'
const imageUpload = data => {
  // const param = new FormData()
  // param.append('image', data)
  // data = param
  return request(
    'post',
    '/image',
    { image: data },
    {
      header: { 'Content-Type': 'multipart/form-data' }
    }
  )
}

const getBanList = page => {
  return request('get', `banner/list/${page}`)
}

const getStudyList = id => {
  return request(
    'get',
    'studyShow',
    {},
    {
      query: {
        id: id
      }
    }
  )
}
export { imageUpload, getBanList, getStudyList }
