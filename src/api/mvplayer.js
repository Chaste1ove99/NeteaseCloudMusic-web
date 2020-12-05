import request from '@/utils/request.js'

/**
 * 获取MV详情
 */
export const getmvdetail = mvid => {
  return request({
    url: '/mv/detail',
    method: 'GET',
    params: {
      mvid
    }
  })
}

/**
 * 获取播放地址
 */
export const getmvurl = id => {
  return request({
    url: '/mv/url',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 获取相关视频
 */
export const getrelatedvideo = id => {
  return request({
    url: '/related/allvideo',
    method: 'GET',
    params: {
      id
    }
  })
}
