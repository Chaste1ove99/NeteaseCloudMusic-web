import request from '@/utils/request'

/**
 * 获取用户信息
 */
export const getSubCount = () => {
  return request({
    method: 'GET',
    url: '/user/subcount'
  })
}
/**
 * 获取我喜欢的音乐
 */
export const getlikelist = (userID, timestamp) => {
  return request({
    method: 'GET',
    url: '/likelist',
    params: {
      uid: userID,
      timestamp
    }
  })
}
/**
 * 获取用户歌单
 */
export const userPlayList = (userID, page) => {
  return request({
    method: 'GET',
    url: '/user/playlist',
    params: {
      uid: userID,
      limit: 999,
      offset: (page) * 20
    }
  })
}

/**
 * 获取用户详情
 */
export const getUserDetail = userID => {
  return request({
    method: 'GET',
    url: '/user/detail',
    params: {
      uid: userID
    }
  })
}

/**
 * 收藏/喜欢音乐
 */
export const toggerlike = (id, like, timestamp) => {
  return request({
    method: 'POST',
    url: '/like',
    params: {
      id,
      like,
      timestamp
    }
  })
}

/**
 * 获取账号信息
 */
export const getAccount = () => {
  return request({
    method: 'GET',
    url: '/user/account'
  })
}

/**
 * 获取用户关注
 */
export const getFollows = id => {
  return request({
    method: 'GET',
    url: '/user/follows',
    params: {
      uid: id,
      limit: 30
    }
  })
}

/**
 * 获取用户粉丝
 */
export const getFolloweds = id => {
  return request({
    method: 'GET',
    url: '/user/followeds',
    params: {
      uid: id,
      limit: 30
    }
  })
}

/**
 * 获取用户动态
 */
export const getEvent = id => {
  return request({
    method: 'GET',
    url: '/user/event',
    params: {
      uid: id,
      limit: 30
    }
  })
}

/**
 * 私人FM
 */
export const personalFm = () => {
  return request({
    method: 'GET',
    url: '/personal_fm'
  })
}

/**
 * 获取私信通知
 */
export const getmsgprivate = (page, timestamp) => {
  return request({
    method: 'GET',
    url: '/msg/private',
    params: {
      limit: 8,
      offset: (page) * 8,
      timestamp
    }
  })
}
