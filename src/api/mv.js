import request from '@/utils/request.js'

/**
 * 获取最新MV
 */

export const getNewMV = () => {
  return request({
    method: 'GET',
    url: '/mv/first',
    params: {
      limit: 5
    }
  })
}

/**
 * 获取网易独家MV
 */

export const getNTESMV = () => {
  return request({
    method: 'GET',
    url: '/mv/exclusive/rcmd',
    params: {
      limit: 12
    }
  })
}
