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

/**
 * 获取 mv 点赞转发评论数数据 */
export const getdetailinfo = (mvid, timestamp) => {
  return request({
    url: '/mv/detail/info',
    method: 'GET',
    params: {
      mvid,
      timestamp
    }
  })
}

/**
 * 获取MV评论
 */
export const getmvcomment = (id, page, timestamp) => {
  return request({
    method: 'POST',
    url: '/comment/mv',
    params: {
      id,
      offset: (page) * 20,
      timestamp
    }
  })
}
