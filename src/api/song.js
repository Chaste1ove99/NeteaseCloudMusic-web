import request from '@/utils/request.js'
/**
 * 获取音乐详情
 */
export const getSongDetail = id => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: {
      id
    }
  })
}
