import request from '@/utils/request.js'

/**
 * 获取歌单（网友精选）
 */
export const getAllList = (pageNum, cat) => {
  return request({
    method: 'GET',
    url: '/top/playlist',
    params: {
      limit: 48,
      offset: (pageNum) * 48,
      cat
    }
  })
}
/**
 * 获取歌单分类
 */
export const getCatList = () => {
  return request({
    method: 'GET',
    url: '/playlist/catlist'
  })
}
