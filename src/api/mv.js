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

/**
 * 获取全部MV
 */

export const getAllMV = (area, type, order, page) => {
  return request({
    method: 'GET',
    url: '/mv/all',
    params: {
      area,
      type,
      order,
      limit: 20,
      offset: (page) * 20
    }
  })
}
