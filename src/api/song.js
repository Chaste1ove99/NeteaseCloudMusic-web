import request from '@/utils/request.js'

/**
 * 获取音乐url 可选参数br 最大999000
 */
export const getSongUrl = id => {
  return request({
    method: 'GET',
    url: '/song/url',
    params: {
      id,
      br: 320000
    }
  })
}

/**
 * 新碟上架
 */
export const getTopAlbum = page => {
  return request({
    method: 'GET',
    url: '/top/album',
    params: {
      limit: 20,
      offset: (page) * 20
    }
  })
}

/**
 * 获取全部新碟
 */
export const getNewAlbum = () => {
  return request({
    method: 'GET',
    url: '/album/new',
    params: {
      limit: 100
    }
  })
}

/**
 * 新歌速递
 */
export const getTopSong = type => {
  return request({
    method: 'GET',
    url: '/top/song',
    params: {
      type
    }
  })
}

/**
 * 获取专辑
 */
export const getAlbum = (id, timestamp) => {
  return request({
    method: 'GET',
    url: '/album',
    params: {
      id,
      timestamp
    }
  })
}

/**
 * 获取专辑评论
 */
export const getAlbumComment = (id, page, timestamp) => {
  return request({
    method: 'GET',
    url: '/comment/album',
    params: {
      id,
      offset: (page) * 20,
      timestamp
    }
  })
}

/**
 * 给评论点赞
 */

export const likeComment = (id, cid, t, type, timestamp) => {
  return request({
    method: 'GET',
    url: '/comment/like',
    params: {
      id,
      cid,
      t,
      type,
      timestamp
    }
  })
}

/**
 * 发送/删除评论
 */
export const handleComment = (t, type, id, content, commentId, timestamp) => {
  return request({
    method: 'GET',
    url: '/comment',
    params: {
      t,
      type,
      id,
      content,
      timestamp,
      commentId
    }
  })
}

/**
 * 请求完整的歌单
 */
export const getallsongs = ids => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: {
      ids
    }
  })
}
