import request from '@/utils/request.js'
/**
 * 获取音乐详情
 */
export const getSongDetail = id => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: {
      ids: id
    }
  })
}

/**
 * 获取音乐url 可选参数br 最大999000
 */
export const getSongUrl = id => {
  return request({
    method: 'GET',
    url: '/song/url',
    params: {
      id,
      br: 320000
    }
  })
}
