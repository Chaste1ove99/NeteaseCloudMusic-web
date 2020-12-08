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

// 发送私信
export const sendtext = (ids, timestamp, msg) => {
  return request({
    method: 'GET',
    url: '/send/text',
    params: {
      user_ids: ids,
      timestamp,
      msg
    }
  })
}

/**
 * 关注用户
 */
export const followUser = (id, t, timestamp) => {
  return request({
    method: 'GET',
    url: '/follow',
    params: {
      id,
      t,
      timestamp
    }
  })
}

/**
 * 获取用户关注
 */
export const getFollow = (uid, page, timestamp) => {
  return request({
    method: 'GET',
    url: '/user/follows',
    params: {
      uid,
      offset: (page) * 10,
      limit: 10,
      timestamp
    }
  })
}

/**
 * 获取用户粉丝
 */
export const getFollowed = (uid, lasttime) => {
  return request({
    method: 'GET',
    url: '/user/followeds',
    params: {
      uid,
      limit: 10,
      lasttime
    }
  })
}
