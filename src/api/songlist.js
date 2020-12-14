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

/**
 * 获取歌单详情
 */
export const getListDetail = (id, timestamp) => {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params: {
      id,
      timestamp
    }
  })
}

/**
 * 获取歌单评论
 */
export const getListComment = (id, pageNum, timestamp) => {
  return request({
    method: 'GET',
    url: '/comment/playlist',
    params: {
      id,
      limit: 20,
      offset: (pageNum) * 20,
      timestamp
    }
  })
}

/**
 * 删除歌单
 */
export const deletelist = id => {
  return request({
    method: 'GET',
    url: '/playlist/delete',
    params: {
      id
    }
  })
}

/**
 * 创建歌单
 */
export const cretalist = name => {
  return request({
    method: 'get',
    url: '/playlist/create',
    params: {
      name
    }
  })
}

/**
 * 对歌单添加或删除歌曲
 */
export const handlesonglist = (op, pid, tracks, timestamp) => {
  return request({
    method: 'GET',
    url: '/playlist/tracks',
    params: {
      op,
      pid,
      tracks,
      timestamp
    }
  })
}
