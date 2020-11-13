import request from '@/utils/request.js'

/**
 * 热门电台
 */
export const gethotChannel = page => {
  return request({
    method: 'GET',
    url: '/dj/hot',
    params: {
      limit: 20,
      offset: (page) * 20
    }
  })
}

/**
 * 付费精选
 */
export const getpaygift = () => {
  return request({
    method: 'GET',
    url: '/dj/paygift',
    params: {
      limit: 6
    }
  })
}
/**
 * 分类
*/
export const getcatelist = () => {
  return request({
    method: 'GET',
    url: '/dj/catelist'
  })
}
