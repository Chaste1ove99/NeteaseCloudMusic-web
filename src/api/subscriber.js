import request from '../utils/request.js'

// 获取用户详情
export const getuserdetail = uid => {
  return request({
    method: 'get',
    url: '/user/detail',
    params: {
      uid
    }
  })
}
