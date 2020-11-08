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
export const getlikelist = userID => {
  return request({
    method: 'GET',
    url: '/likelist',
    params: {
      uid: userID
    }
  })
}
/**
 * 获取用户歌单
 */
export const userPlayList = userID => {
  return request({
    method: 'GET',
    url: '/user/playlist',
    params: {
      uid: userID,
      limit: 20
    }
  })
}
